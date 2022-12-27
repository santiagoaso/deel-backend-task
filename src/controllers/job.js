const JobService = require('../services/job')
const Logger = require('../utils/logger')

exports.getUnpaid = async (req, res) => {
    const profileId = req.profile.id
    Logger.info('job_controller.get_unpaid.start', {
        profileId
    })
    try {
        const unpaidJobs = await JobService.getUnpaid(profileId)
        Logger.info('job_controller.get_unpaid.success', {
            profileId,
            unpaidJobs
        })
        return res.json(unpaidJobs)
    } catch (e) {
        Logger.error('job_controller.get_unpaid.error', {
            profileId,
            error: e.message
        })
        return res.status(500).json({error: e.message}).end()
    }
}

exports.pay = async (req, res) => {
    const {job_id: jobId} = req.params
    if (!jobId) return res.status(400).end()

    const profile = req.profile
    Logger.info('job_controller.pay.start', {
        jobId,
        profile
    })
    try {
        const response = await JobService.pay(jobId, profile)
        Logger.info('job_controller.pay.success', {
            jobId,
            profile,
            response
        })
        return res.json(response)
    } catch (e) {
        Logger.error('job_controller.pay.error', {
            jobId,
            profile,
            error: e.message
        })
        return res.status(e.statusCode).json({error: e.message}).end()
    }
}