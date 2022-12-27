const Job = require('../models/job')
const Contract = require('../models/contract')
const {contractAccessible} = require('../db/helper')

exports.getUnpaid = async (profileId) => {
    return Job.findAll({
        include: [{
            model: Contract,
            required: true,
            where: contractAccessible(profileId)
        }],
        where: {
            paid: false
        }
    })
}