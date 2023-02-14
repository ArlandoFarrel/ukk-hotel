const { response } = require('express')

const modelKamar = require('../models/index').kamar
const Op = require('sequelize').Op

exports.getAllKamar = async (request, response) => {
    let kamars = await modelKamar.findAll()
    return response.json({
        succes: true,
        data: kamars,
        message: 'All Kamar Have Been Loaded'
    })
}

/** create function for filter */
exports.findKamar = async (request, response) => {
    /** define keyword to find data */
    let nomor_kamar = request.body.nomor_kamar
    let id_tipe_kamar = request.body.id_tipe_kamar
    let kamars = await modelKamar.findAll({
        where: {
            [Op.or]: [
                { nomor_kamar: { [Op.substring]: nomor_kamar } },
                { id_tipe_kamar: { [Op.substring]: id_tipe_kamar } }
            ]
        }
    })

    return response.json({
        success: true,
        data: kamars,
        message: `All Kamar have been loaded`
    })
}


/** create function for add new member */
exports.addKamar = (request, response) => {
    /** prepare data from request */
    let newKamar = {
        nomor_kamar: request.body.nomor_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar
    }
    /** execute inserting data to member's table */
    modelKamar.create(newKamar)
        .then(result => {
            /** if insert's process success */
            return response.json({
                success: true,
                data: result,
                message: `New kamar has been inserted`
            })
        })
        .catch(error => {
            /** if insert's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}


/** create function for update member */
exports.updateKamar = (request, response) => {
    /** prepare data that has been changed */
    let dataKamar = {
        nomor_kamar: request.body.nomor_kamar,
        id_tipe_kamar: request.body.id_tipe_kamar
    }
    /** define id member that will be update */
    let idKamar = request.params.id
    /** execute update data based on defined id member */
    modelKamar.update(dataKamar, { where: { id: idKamar } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data kamar has been updated`
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



/** create function for delete data */
exports.deleteKamar = (request, response) => {
    /** define id member that will be update */
    let idKamar = request.params.id
    /** execute delete data based on defined id member */
    modelKamar.destroy({ where: { id: idKamar } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data kamar has been updated`
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

