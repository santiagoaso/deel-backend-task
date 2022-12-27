const JobRepository = require('../repositories/job')
const db = require('../db/sequelize')
const {NotFoundException, ValidationException, QueryException} = require('../utils/exceptions')

exports.getUnpaid = async (profileId) => {
    return await JobRepository.getUnpaid(profileId)
}

validatePayment = (profile, job) => {
    if (!job) {
        throw new NotFoundException('Job not found')
    }
    if (job.paid) {
        throw new ValidationException('Job is already paid')
    }
    if (job.Contract.Client.id !== profile.id) {
        throw new ValidationException('Client is not owner of job')
    }
    if (profile.balance < job.price) {
        throw new ValidationException('Client balance is not enough to pay selected job')
    }
}

doPay = async (jobToPay) => {
    const transaction = await db.transaction();
    const options = { transaction, lock: transaction.LOCK.UPDATE };

    try {
        const job = await JobRepository.get(jobToPay.id, options)
        const client = job.Contract.Client
        const contractor = job.Contract.Contractor

        await client.update({
            balance: job.Contract.Client.balance - job.price
        }, options)

        await contractor.update({
            balance: job.Contract.Contractor.balance + job.price
        }, options)

        await job.update({
            paid: true,
            paymentDate: new Date(),
        }, options)

        await transaction.commit();
        return job
    } catch (e) {
        transaction.rollback()
        throw new QueryException('Error on paying job')
    }
}

exports.pay = async (jobId, profile) => {
    const job = await JobRepository.get(jobId)
    validatePayment(profile, job)
    return await doPay(job)
}