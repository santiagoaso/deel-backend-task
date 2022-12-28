const {validatePayment} = require('../services/job')
const {validateDeposit} = require('../services/profile')
const {NotFoundException, ValidationException, QueryException} = require('../utils/exceptions')

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

describe("Payment validations", () => {
    it("Should throw Exception if balance is not enough", async () => {
        const profile = {
            id: 1,
            firstName: 'Harry',
            lastName: 'Potter',
            profession: 'Wizard',
            balance: 100,
            type:'client'
        }
        const job = {
            description: 'work',
            price: 200,
            paid:false,
            paymentDate:'2020-08-15T19:11:26.737Z',
            ContractId: 7,
            Contract: {
                id:1,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 1,
                ContractorId:5,
                Client: {
                    id: 1,
                    firstName: 'Harry',
                    lastName: 'Potter',
                    profession: 'Wizard',
                    balance: 1150,
                    type:'client'
                }
            }
        }
        expect(() => {
            validatePayment(profile, job)
        }).toThrow('Client balance is not enough to pay selected job')
    })

    it("Should throw Exception if balance is not enough", async () => {
        const profile = {
            id: 1,
            firstName: 'Harry',
            lastName: 'Potter',
            profession: 'Wizard',
            balance: 300,
            type:'client'
        }
        const job = {
            description: 'work',
            price: 200,
            paid:false,
            paymentDate:'2020-08-15T19:11:26.737Z',
            ContractId: 7,
            Contract: {
                id:1,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 1,
                ContractorId:5,
                Client: {
                    id: 3,
                    firstName: 'Harry',
                    lastName: 'Potter',
                    profession: 'Wizard',
                    balance: 1150,
                    type:'client'
                }
            }
        }
        expect(() => {
            validatePayment(profile, job)
        }).toThrow('Client is not owner of job')
    })

    it("Should throw Exception if job is already paid", async () => {
        const profile = {
            id: 1,
            firstName: 'Harry',
            lastName: 'Potter',
            profession: 'Wizard',
            balance: 300,
            type:'client'
        }
        const job = {
            description: 'work',
            price: 200,
            paid:true,
            paymentDate:'2020-08-15T19:11:26.737Z',
            ContractId: 7,
            Contract: {
                id:1,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 1,
                ContractorId:5,
                Client: {
                    id: 3,
                    firstName: 'Harry',
                    lastName: 'Potter',
                    profession: 'Wizard',
                    balance: 1150,
                    type:'client'
                }
            }
        }
        expect(() => {
            validatePayment(profile, job)
        }).toThrow('Job is already paid')
    })

    it("Should throw Exception if no job is given", async () => {
        const profile = {
            id: 1,
            firstName: 'Harry',
            lastName: 'Potter',
            profession: 'Wizard',
            balance: 300,
            type:'client'
        }
        const job = null
        expect(() => {
            validatePayment(profile, job)
        }).toThrow('Job not found')
    })

    it("Should not throw exception if the job given is correct", async () => {
        const profile = {
            id: 1,
            firstName: 'Harry',
            lastName: 'Potter',
            profession: 'Wizard',
            balance: 400,
            type:'client'
        }
        const job = {
            description: 'work',
            price: 200,
            paid:false,
            paymentDate:'2020-08-15T19:11:26.737Z',
            ContractId: 7,
            Contract: {
                id:1,
                terms: 'bla bla bla',
                status: 'in_progress',
                ClientId: 1,
                ContractorId:5,
                Client: {
                    id: 1,
                    firstName: 'Harry',
                    lastName: 'Potter',
                    profession: 'Wizard',
                    balance: 1150,
                    type:'client'
                }
            }
        }
        expect(() => {
            validatePayment(profile, job)
        }).not.toThrow()
    })
})

describe("Deposit validations", () => {
    it("Should not throw exception if amount is less than 25% of unpaidSum", async () => {
        const amount = 100
        const unpaidSum = 500
        expect(() => {
            validateDeposit(amount, unpaidSum)
        }).not.toThrow()
    })

    it("Should throw Exception if amount is greater than unpaidSum", async () => {
        const amount = 100
        const unpaidSum = 10
        expect(() => {
            validateDeposit(amount, unpaidSum)
        }).toThrow('Client can not deposit more than 25% of jobs to pay')
    })

    it("Should throw Exception if amount is equal to unpaidSum", async () => {
        const amount = 100
        const unpaidSum = 100
        expect(() => {
            validateDeposit(amount, unpaidSum)
        }).toThrow('Client can not deposit more than 25% of jobs to pay')
    })

    it("Should throw Exception if amount is less than unpaidSum but not less than 25% of it", async () => {
        const amount = 90
        const unpaidSum = 100
        expect(() => {
            validateDeposit(amount, unpaidSum)
        }).toThrow('Client can not deposit more than 25% of jobs to pay')
    })
})