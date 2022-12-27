const {Op} = require("sequelize");

const contractAccessible = (profileId) => {
    return {
        [Op.or]: [
            {ClientId: profileId},
            {ContractorId: profileId}
        ]
    }
}

const betweenDates = (start, end) => {
    return {
        [Op.between]: [
            start,
            end
        ]
    }
}

module.exports = {
    contractAccessible,
    betweenDates
}