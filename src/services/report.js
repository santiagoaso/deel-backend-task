const ReportRepository = require("../repositories/report")

exports.bestProfession = async (start, end) => {
    return await ReportRepository.bestProfession(start, end)
}

exports.bestClients = async (start, end, limit) => {
    return await ReportRepository.bestClients(start, end, limit)
}