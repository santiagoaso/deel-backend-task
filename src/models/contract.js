const { Model, ENUM, TEXT } = require("sequelize")
const db = require('../db/sequelize')

class Contract extends Model {
    static get STATUS_ACTIVE() { return 'in_progress' }

    static relationships(models) {
        Contract.belongsTo(models.Profile, { as: "Contractor" })
        Contract.belongsTo(models.Profile, { as: "Client" })
        Contract.hasMany(models.Job)
    }
}

Contract.init(
    {
        terms: {
            type: TEXT,
            allowNull: false
        },
        status:{
            type: ENUM('new','in_progress','terminated')
        }
    },
    {
        sequelize: db,
        modelName: 'Contract'
    }
)

module.exports = Contract
