const {getProfile} = require('./middleware/getProfile')
const ContractController = require('./controllers/contract')
const JobController = require('./controllers/job')

module.exports = (app) => {
    // Contracts
    app.get('/contracts/:id', getProfile, ContractController.get)
    app.get('/contracts', getProfile, ContractController.getAll)

    // Jobs
    app.get('/jobs/unpaid', getProfile, JobController.getUnpaid)
    app.post('/jobs/:job_id/pay', getProfile, JobController.pay)
}