const JobRepository = require('../repositories/job')

exports.get = async (id) => {
    return await JobRepository.get(id)
}