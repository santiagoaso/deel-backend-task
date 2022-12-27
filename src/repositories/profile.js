const Profile = require('../models/contract')

exports.get = async (id) => {
    return await Profile.findOne({
        where: {
            id
        },
        raw: true
    })
}