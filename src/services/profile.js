const ProfileRepository = require('../repositories/profile')

exports.get = async (id) => {
    return await ProfileRepository.get(id)
}