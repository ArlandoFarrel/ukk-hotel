const modelTipe = require('../models/index').tipe_kamar

const Op = require('sequelize').Op
/** load library 'path' and 'filestream' */
const path = require(`path`)
const fs = require(`fs`)

/** load function from `upload-cover`
* single(`cover`) means just upload one file
* with request name `cover`
*/
const upload = require(`./upload-cover`).single(`foto`)


exports.getAllTipe = async (request, response) => {
    let tipe = await modelTipe.findAll()
    return response.json({
        succes: true,
        data: tipe,
        message: 'All Types Have Been Loaded'
    })
}

/** create function for filter */
exports.findTipe = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword
    // let nama_user = request.body.nama_user
    // let foto = request.body.foto
    // let email = request.body.email
    // let password = request.body.password
    // let role = request.body.role

    //nama diganti keyword
    let tipe = await modelTipe.findAll({
        where: {
            [Op.or]: [
                { nama_tipe_kamar: { [Op.substring]: nama_tipe_kamar } },
                { harga: { [Op.substring]: harga } },
                { deskripsi: { [Op.substring]: deskripsi } },
                { foto: { [Op.substring]: foto } }
            ]
        }
    })

    return response.json({
        success: true,
        data: tipe,
        message: `All Types have been loaded`
    })
}


/** create function for add new member */
exports.addTipe = (request, response) => {
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
    let newTipe = {
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.file.filename
    }
    /** execute inserting data to member's table */
    modelTipe.create(newTipe)
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true,
                data: result,
                message: `New type has been inserted`
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
exports.updateTipe = (request, response) => {
     /** run upload function */
     upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }
        /** store selected book ID that will update */
        
   
    /** prepare data that has been changed */
    let dataTipe = {
        nama_tipe_kamar: request.body.nama_tipe_kamar,
        harga: request.body.harga,
        deskripsi: request.body.deskripsi,
        foto: request.file.filename
    }

    /** define id member that will be update */
    let id = request.params.id
     /** check if file is not empty,
        * it means update data within reupload file
        */
      if (request.file) {
        /** get selected book's data */
        const selectedBook = await modelTipe.findOne({
            where: { id: id }
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
        dataTipe.foto = request.file.filename
    }
    /** execute update data based on defined id member */
    modelTipe.update(dataTipe, { where: { id: id } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data Tipe Kamar has been updated`
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
exports.deleteTipe = async (request, response) => {
     /** store selected book's ID that will be delete */
     const id = request.params.id
     /** -- delete cover file -- */
     /** get selected book's data */
     const tipe = await modelTipe.findOne({ where: { id: id } })
     /** get old filename of cover file */
     const oldCoverBook = tipe.foto
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
    modelTipe.destroy({ where: { id: id } })
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

