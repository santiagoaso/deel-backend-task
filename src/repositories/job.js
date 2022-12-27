const Job = require('../models/job')

exports.get = async (id) => {
    return await Job.findOne({
        where: {
            id
        },
        raw: true
    })
}