const {getProfile} = require('./middleware/getProfile')
const ContractController = require('./controllers/contract')
const ProfileController = require('./controllers/profile')
const JobController = require('./controllers/job')
const ReportController = require('./controllers/report')

module.exports = (app) => {
    // Contracts
    app.get('/contracts/:id', getProfile, ContractController.get)
    app.get('/contracts', getProfile, ContractController.getAll)

    // Jobs
    app.get('/jobs/unpaid', getProfile, JobController.getUnpaid)
    app.post('/jobs/:job_id/pay', getProfile, JobController.pay)

    // Profiles
    app.post('/balances/deposit/:userId', getProfile, ProfileController.deposit)

    // Admin
    //Returns the profession that earned the most money (sum of jobs paid)
    // for any contactor that worked in the query time range.
    app.post('/admin/best-profession?start=:start&end=:end', ReportController.bestProfession)
    //returns the clients the paid the most for jobs in the query time period.
    // limit query parameter should be applied, default limit is 2.
    app.post('/admin/best-clients?start=:start&end=:end&limit=:limit', ReportController.bestClients)
}