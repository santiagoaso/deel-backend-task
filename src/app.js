const express = require('express')
const bodyParser = require('body-parser')
const {sequelize} = require('./db/sequelize')
const routes = require('./routes')
const {initializeModels} = require('./models/init')

const app = express()
initializeModels()
app.use(bodyParser.json())
app.set('sequelize', sequelize)
routes(app)

module.exports = app
