const { Model, STRING, DECIMAL, ENUM } = require("sequelize")
const db = require('../db/sequelize')

class Profile extends Model {
    static get TYPE_CLIENT() { return 'client' }

    static relationships(models) {
        Profile.hasMany(models.Contract, {as :'Contractor',foreignKey:'ContractorId'})
        Profile.hasMany(models.Contract, {as : 'Client', foreignKey:'ClientId'})
    }
}

Profile.init(
    {
        firstName: {
            type: STRING,
            allowNull: false
        },
        lastName: {
            type: STRING,
            allowNull: false
        },
        profession: {
            type: STRING,
            allowNull: false
        },
        balance:{
            type: DECIMAL(12,2)
        },
        type: {
            type: ENUM('client', 'contractor')
        }
    },
    {
        sequelize: db,
        modelName: 'Profile'
    }
)


module.exports = Profile
