const db = require('../db/sequelize')
const Job = require("../models/job");
const Contract = require("../models/contract");
const Profile = require("../models/profile");
const {QueryException} = require('../utils/exceptions')
const {betweenDates} = require("../db/helper")

exports.bestProfession = async (start, end) => {
    try {
        return await Job.findOne({
            subQuery: false,
            attributes: [
                'Contract->Contractor.profession',
                [db.fn('MAX', db.col('price')), 'total']
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
            order: [[db.fn('MAX', db.col('price')), 'DESC']]
        })
    } catch (e) {
        throw QueryException('Error obtaining best profession')
    }
}

exports.bestClients = async (start, end, limit) => {
    try {
        return await Job.findAll({
            subQuery: false,
            attributes: [
                'Contract->Client.id',
                [db.literal("firstName || ' ' || lastName"), 'fullName'],
                [db.fn('SUM', db.col('price')), 'paid']
            ],
            include: [{
                model: Contract,
                required: true,
                attributes: [],
                include: [{
                    model: Profile,
                    required: true,
                    as: 'Client',
                    attributes: []
                }]
            }],
            where: {
                paymentDate: betweenDates(start, end),
                paid: true
            },
            group: 'Contract->Client.id',
            raw: true,
            order: [[db.fn('SUM', db.col('price')), 'DESC']],
            limit
        })
    } catch (e) {
        throw QueryException('Error obtaining best clients')
    }
}