const Contract = require('./contract')
const Profile = require('./profile')
const Job = require('./job')

const initializeModels = () => {
    const models = {
        Contract,
        Profile,
        Job,
    }

    Object.values(models).forEach((model) => {
        if (model.associate) {
            model.associate(models)
        }
    })
}

module.exports = { initializeModels }
