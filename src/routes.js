const {getProfile} = require('./middleware/getProfile')
const ContractController = require('./controllers/contract')
const ProfileController = require('./controllers/profile')
const JobController = require('./controllers/job')
const ReportController = require('./controllers/report')

module.exports = (app) => {
    // Contracts
    app.get('/contracts/:id', getProfile, ContractController.get)
    app.get('/contracts', getProfile, ContractController.getNonTerminated)

    // Jobs
    app.get('/jobs/unpaid', getProfile, JobController.getUnpaid)
    app.post('/jobs/:job_id/pay', getProfile, JobController.pay)

    // Profiles
    app.post('/balances/deposit/:userId', getProfile, ProfileController.deposit)

    // Admin
    app.get('/admin/best-profession', getProfile, ReportController.bestProfession)
    app.get('/admin/best-clients', getProfile, ReportController.bestClients)
}