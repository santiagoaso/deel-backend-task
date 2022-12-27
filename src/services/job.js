const JobRepository = require('../repositories/job')

exports.getUnpaid = async (profileId) => {
    return await JobRepository.getUnpaid(profileId)
}