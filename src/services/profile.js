const ProfileRepository = require('../repositories/profile')
const JobRepository = require('../repositories/job')
const {ValidationException, QueryException} = require("../utils/exceptions");
const db = require("../db/sequelize");

exports.get = async (id, options = {}) => {
    return await ProfileRepository.get(id, options)
}

validateDeposit = (amount, unpaidSum) => {
    if (amount > unpaidSum * 0.25) {
        throw new ValidationException('Client can not deposit more than 25% of jobs to pay')
    }
}

doDeposit = async (profile, amount) => {
    const transaction = await db.transaction();
    const options = { transaction, lock: transaction.LOCK.UPDATE };

    try {
        const client = await this.get(profile.id, options)

        try {
            await client.update({
                balance: client.balance + amount
            }, options)
        } catch (e) {
            throw new QueryException('Error on deposit')
        }

        await transaction.commit();
        return client
    } catch (e) {
        transaction.rollback()
        throw e
    }
}

exports.deposit = async (profile, amount) => {
    const unpaidSum = await JobRepository.getSumUnpaid(profile.id) || 0
    validateDeposit(amount, unpaidSum)
    return await doDeposit(profile, amount)
}