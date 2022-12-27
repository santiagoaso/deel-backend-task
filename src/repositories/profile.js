const Profile = require('../models/profile')

exports.get = async (id, options) => {
    return await Profile.findOne({
        where: { id }
    }, options)
}