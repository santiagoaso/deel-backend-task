const Job = require('../models/job')
const Contract = require('../models/contract')
const Profile = require('../models/profile')
const {contractAccessible} = require('../db/helper')

exports.get = async (id, options = {}) => {
    return await Job.findOne({
        include: [{
            model: Contract,
            required: true,
            include: [{
                model: Profile,
                required: true,
                as: 'Client'
            },{
                model: Profile,
                required: true,
                as: 'Contractor'
            }]
        }],
        where: { id }
    },
        options
    )
}

exports.getUnpaid = async (profileId) => {
    return await Job.findAll({
        include: [{
            model: Contract,
            required: true,
            where: {
                status: Contract.STATUS_ACTIVE,
                ...contractAccessible(profileId)
            }
        }],
        where: {
            paid: false
        }
    })
}