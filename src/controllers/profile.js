const ProfileService = require('../services/profile')

exports.get = async (req, res) => {
    const {id} = req.params
    if (!id) return res.status(400).end()

    const profile = await ProfileService.get(id)
    if (!profile) return res.status(404).end()
    res.json(profile)
}