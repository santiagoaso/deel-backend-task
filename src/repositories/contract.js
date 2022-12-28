const Contract = require('../models/contract')
const {contractAccessible} = require('../db/helper')
const {Op} = require("sequelize");

exports.get = async (id, profileId) => {
    return Contract.findOne({
        where: {
            id,
            ...contractAccessible(profileId)
        }
    })
}

exports.getNonTerminated = async (profileId) => {
    return Contract.findAll({
        where: {
            status: {
                [Op.ne]: Contract.STATUS_TERMINATED
            },
            ...contractAccessible(profileId)
        }
    })
}