const JobService = require('../services/job')

exports.getUnpaid = async (req, res) => {
    const profileId = req.profile.id
    const unpaidJobs = await JobService.getUnpaid(profileId)
    res.json(unpaidJobs)
}

exports.pay = async (req, res) => {
    const {job_id: jobId} = req.params
    if (!jobId) return res.status(400).end()

    const profile = req.profile
    try {
        const response = await JobService.pay(jobId, profile)
        res.json(response)
    } catch (e) {
        return res.status(e.statusCode).json({error: e.message}).end()
    }
}