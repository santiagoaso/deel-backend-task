const {Op} = require("sequelize");

const contractAccessible = (profileId) => {
    return {
        [Op.or]: [
            {ClientId: profileId},
            {ContractorId: profileId}
        ]
    }
}

module.exports = {
    contractAccessible
}