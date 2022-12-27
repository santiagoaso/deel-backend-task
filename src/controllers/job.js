const JobService = require('../services/job')

exports.get = async (req, res) => {
    const {id} = req.params
    if (!id) return res.status(400).end()

    const contract = await JobService.get(id)
    if(!contract) return res.status(404).end()
    res.json(contract)
}