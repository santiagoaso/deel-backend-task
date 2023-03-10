const ProfileService = require('../services/profile')
const Profile = require('../models/profile')
const {ValidationException} = require("../utils/exceptions");
const Logger = require("../utils/logger");

exports.get = async (req, res) => {
    const {id} = req.params
    if (!id) return res.status(400).end()

    const profile = await ProfileService.get(id)
    if (!profile) return res.status(404).end()
    res.json(profile)
}

validateParams = (profile, profileId, amount) => {
    if (profile.id !== profileId) {
        throw new ValidationException('User id does not match authenticated user')
    }
    if (profile.type !== Profile.TYPE_CLIENT) {
        throw new ValidationException('Authenticated user is not a Client')
    }
    if (isNaN(amount) || amount <= 0) {
        throw new ValidationException('Amount sent is invalid')
    }
}

exports.deposit = async (req, res) => {
    let {userId: profileId} = req.params
    profileId = parseInt(profileId)
    if (!profileId) return res.status(400).end()
    const profile = req.profile
    const amount = req.body.amount

    Logger.info('profile_controller.deposit.start', {
        profileId,
        amount
    })
    try {
        validateParams(profile, profileId, amount)
    } catch (e) {
        Logger.warning('profile_controller.deposit.invalid_params', {
            profileId,
            amount,
            error: e.message
        })
        return res.status(e.statusCode).json({error: e.message}).end()
    }

    try {
        const response = await ProfileService.deposit(profile, amount)
        Logger.info('profile_controller.deposit.success', {
            profileId,
            amount,
            response
        })
        res.json(response)
    } catch (e) {
        Logger.error('profile_controller.deposit.error', {
            profileId,
            amount,
            error: e.message
        })
        return res.status(e.statusCode).json({error: e.message}).end()
    }
}