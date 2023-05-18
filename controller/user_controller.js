const modelUser = require('../models/index').user

const Op = require('sequelize').Op
/** load library 'path' and 'filestream' */
const path = require(`path`)
const fs = require(`fs`)

/** load function from `upload-cover`
* single(`cover`) means just upload one file
* with request name `cover`
*/
const upload = require(`./upload-cover`).single(`foto`)


exports.getAllUser = async (request, response) => {
    let users = await modelUser.findAll({
        attributes: ['id', 'nama_user', 'email', 'foto', 'role', 'password']
    })
    return response.json({
        succes: true,
        data: users,
        message: 'All Users Have Been Loaded'
    })
}

/** create function for filter */
exports.findUser = async (request, response) => {
   
    let nama_user = request.body.nama_user
    let user = await modelUser.findAll({
        where: {
            [Op.or]: [
                { nama_user: { [Op.substring]: nama_user } }
            ]
        }
    })
    return response.json({
        success: true,
        data: user,
        message: `All tipe kamar have been loaded`

    })
    
}

exports.findUserEmail = async (request, response) => {
   
    let email = request.body.email
    let users = await modelUser.findAll({
        where: {
          email: {
            [Op.substring]: email
          }
        }
      })
      
    return response.json({
        success: true,
        data: users,
        message: `All User have been loaded`

    })
    
}





/** create function for add new member */
exports.addUser = (request, response) => {
    /** run function upload */
    upload(request, response, async error => {
        /** check if there are errorwhen upload */
        if (error) {
            return response.json({ message: error })
        }
        /** check if file is empty */
        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }
    /** prepare data from request */
    let newUser = {
        nama_user: request.body.nama_user,
        foto: request.file.filename,
        email: request.body.email,
        password: request.body.password,
        role: request.body.role
    }
    /** execute inserting data to member's table */
    modelUser.create(newUser)
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true,
                data: result,
                message: `New user has been inserted`
            })
        })
        .catch(error => {
            /** if insert's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
 }) 
}



/** create function for update member */
exports.updateUser = (request, response) => {
     /** run upload function */
     upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }
        /** store selected book ID that will update */
        
   
    /** prepare data that has been changed */
    let dataUser = {
        nama_user: request.body.nama_user,
        email: request.body.email,
        password: request.body.password,
        role: request.body.role
        
    }

    /** define id member that will be update */
    let idUser = request.params.id
     /** check if file is not empty,
        * it means update data within reupload file
        */
      if (request.file) {
        /** get selected book's data */
        const selectedBook = await modelUser.findOne({
            where: { id: idUser }
        })
        /** get old filename of cover file */
        const oldCoverBook = selectedBook.foto
        /** prepare path of old cover to delete file */
        const pathCover = path.join(__dirname, `../cover`,
            oldCoverBook)
        /** check file existence */
        if (fs.existsSync(pathCover)) {
            /** delete old cover file */
            fs.unlink(pathCover, error =>
                console.log(error))
        }
        /** add new cover filename to book object */
        dataUser.foto = request.file.filename
    }
    /** execute update data based on defined id member */
    modelUser.update(dataUser, { where: { id: idUser } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data member has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
})
}



/** create function for delete data */
exports.deleteUser = async (request, response) => {
     /** store selected book's ID that will be delete */
     const idUser = request.params.id
     /** -- delete cover file -- */
     /** get selected book's data */
     const user = await modelUser.findOne({ where: { id: idUser } })
     /** get old filename of cover file */
     const oldCoverBook = user.foto
     /** prepare path of old cover to delete file */
     const pathCover = path.join(__dirname, `../cover`,
         oldCoverBook)
     /** check file existence */
     if (fs.existsSync(pathCover)) {
         /** delete old cover file */
         fs.unlink(pathCover, error => console.log(error))
     }
     /** -- end of delete cover file -- */

    /** execute delete data based on defined id member */
    modelUser.destroy({ where: { id: idUser } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data member has been updated`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}

