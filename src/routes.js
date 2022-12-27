const {getProfile} = require('./middleware/getProfile')
const ContractController = require('./controllers/contract')
const ProfileController = require('./controllers/profile')
const JobController = require('./controllers/job')

module.exports = (app) => {
    // Contracts
    app.get('/contracts/:id', getProfile, ContractController.get)
    app.get('/contracts', getProfile, ContractController.getAll)

    // Profiles
    app.get('/profiles/:id', ProfileController.get)

    // Jobs
    app.get('/jobs/:id', JobController.get)
}