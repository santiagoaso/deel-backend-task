const ContractService = require('../services/contract')

exports.get = async (req, res) => {
    const {id} = req.params
    if (!id) return res.status(400).end()
    const profileId = req.profile.id

    const contract = await ContractService.get(id, profileId)
    if(!contract) return res.status(404).end()
    res.json(contract)
}

exports.getAll = async (req, res) => {
    const profileId = req.profile.id

    const contract = await ContractService.getAll(profileId)
    if(!contract) return res.status(404).end()
    res.json(contract)
}