const ContractRepository = require('../repositories/contract')

exports.get = async (id, profileId) => {
    return await ContractRepository.get(id, profileId)
}