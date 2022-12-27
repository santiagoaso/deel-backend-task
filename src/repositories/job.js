const Job = require('../models/job')
const Contract = require('../models/contract')
const {Op} = require("sequelize");

exports.getUnpaid = async (profileId) => {
    return Job.findAll({
        include: [{
            model: Contract,
            required: true,
            where: {
                [Op.or]: [
                    { ClientId: profileId },
                    { ContractorId: profileId }
                ]}
        }],
        where: {
            paid: false
        }
    })
}