const {getProfile} = require('./middleware/getProfile')
const ContractController = require('./controllers/contract')

module.exports = (app) => {
    // Contracts
    app.get('/contracts/:id', getProfile, ContractController.get)
};