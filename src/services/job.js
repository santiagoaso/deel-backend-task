const JobRepository = require('../repositories/job')
const db = require('../db/sequelize')
const {NotFoundException, ValidationException, QueryException} = require('../utils/exceptions')

exports.getUnpaid = async (profileId) => {
    return await JobRepository.getUnpaid(profileId)
}

exports.validatePayment = (profile, job) => {
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

        if (client.balance < job.price) {
            throw new ValidationException('Client balance is not enough to pay selected job')
        }

        try {
            await client.update({
                balance: client.balance - job.price
            }, options)

            await contractor.update({
                balance: contractor.balance + job.price
            }, options)

            await job.update({
                paid: true,
                paymentDate: new Date(),
            }, options)

        } catch (e) {
            throw new QueryException('Error on paying job')
        }

        await transaction.commit();
        return job
    } catch (e) {
        transaction.rollback()
        throw e
    }
}

exports.pay = async (jobId, profile) => {
    const job = await JobRepository.get(jobId)
    this.validatePayment(profile, job)
    return await doPay(job)
}