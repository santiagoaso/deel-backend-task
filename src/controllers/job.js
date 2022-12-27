const JobService = require('../services/job')

exports.getUnpaid = async (req, res) => {
    const profileId = req.profile.id
    const unpaidJobs = await JobService.getUnpaid(profileId)
    res.json(unpaidJobs)
}