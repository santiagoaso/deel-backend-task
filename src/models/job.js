const { Model, TEXT, DECIMAL, BOOLEAN, DATE } = require("sequelize")
const db = require('../db/sequelize')

class Job extends Model {

    static get PRICE() { return 'price' }

    static relationships(models) {
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
