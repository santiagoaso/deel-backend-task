const {Op} = require("sequelize");

const Contract = require('../models/contract')

exports.get = async (id, profileId) => {
    return Contract.findOne({
        where: {
            id,
            [Op.or]: [
                { ClientId: profileId },
                { ContractorId: profileId }
            ]}
    })
}