const Profile = require('../models/profile')

exports.get = async (id) => {
    return await Profile.findOne({
        where: { id }
    })
}