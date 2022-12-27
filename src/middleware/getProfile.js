const ProfileService = require('../services/profile')

const getProfile = async (req, res, next) => {
    const profile = await ProfileService.get(req.get('profile_id') || 0)
    if(!profile) return res.status(401).end()
    req.profile = profile
    next()
}
module.exports = {getProfile}