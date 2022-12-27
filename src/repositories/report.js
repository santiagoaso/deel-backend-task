const db = require('../db/sequelize')
const Job = require("../models/job");
const Contract = require("../models/contract");
const Profile = require("../models/profile");
const {QueryException} = require('../utils/exceptions')
const {betweenDates} = require("../db/helper")

exports.bestProfession = async (start, end) => {
    try {
        return await Job.findAll({
            subQuery: false,
            attributes: [
                'Contract->Contractor.profession',
                [db.fn('SUM', db.col('price')), 'total']
            ],
            include: [{
                model: Contract,
                required: true,
                attributes: [],
                include: [{
                    model: Profile,
                    required: true,
                    as: 'Contractor',
                    attributes: []
                }]
            }],
            where: {
                paymentDate: betweenDates(start, end),
                paid: true
            },
            group: 'profession',
            raw: true,
            order: [[db.fn('SUM', db.col('price')), 'DESC']]
        })
    } catch (e) {
        throw QueryException('Error obtaining best profession')
    }
}

exports.bestClients = async (start, end, limit) => {
    //returns the clients the paid the most for jobs in the query time period.
    // limit query parameter should be applied, default limit is 2.
    return 1
}