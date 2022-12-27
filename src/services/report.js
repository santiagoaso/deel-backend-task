const JobRepository = require('../repositories/job')
const db = require('../db/sequelize')
const {NotFoundException, ValidationException, QueryException} = require('../utils/exceptions')

exports.bestProfession = async (start, end) => {
    //Returns the profession that earned the most money (sum of jobs paid)
    // for any contactor that worked in the query time range.
    return 1
}

exports.bestClients = async (start, end, limit) => {
    //returns the clients the paid the most for jobs in the query time period.
    // limit query parameter should be applied, default limit is 2.
    return 1
}