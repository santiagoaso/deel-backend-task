const Contract = require('../models/contract')
const {contractAccessible} = require('../db/helper')

exports.get = async (id, profileId) => {
    return Contract.findOne({
        where: {
            id,
            ...contractAccessible(profileId)
        }
    })
}

exports.getAll = async (profileId) => {
    return Contract.findAll({
        where: contractAccessible(profileId)
    })
}