const ContractRepository = require('../repositories/contract')

exports.get = async (id, profileId) => {
    return await ContractRepository.get(id, profileId)
}

exports.getAll = async (profileId) => {
    return await ContractRepository.getAll(profileId)
}