const { Model, TEXT, DECIMAL, BOOLEAN, DATE } = require("sequelize")
const db = require('../db/sequelize')

class Job extends Model {
    id
    ContractId
    price
    paid
    paymentDate
    createdAt
    updatedAt
    static associate(models) {
        Job.belongsTo(models.Contract)
    }
}

Job.init(
    {
        description: {
            type: TEXT,
            allowNull: false
        },
        price:{
            type: DECIMAL(12,2),
            allowNull: false
        },
        paid: {
            type: BOOLEAN,
            default:false
        },
        paymentDate:{
            type: DATE
        }
    },
    {
        sequelize: db,
        modelName: 'Job'
    }
)


module.exports = Job
