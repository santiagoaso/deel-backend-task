const ReportService = require('../services/report')
const DEFAULT_LIMIT = 2

exports.bestProfession = async (req, res) => {
    const {start, end} = req.query
    if (!start || !end) return res.status(400).end()

    try {
        const response = await ReportService.bestProfession(start, end)
        res.json(response)
    } catch (e) {
        return res.status(e.statusCode).json({error: e.message}).end()
    }
}

exports.bestClients = async (req, res) => {
    const {start, end} = req.query
    if (!start || !end) return res.status(400).end()
    const limit = req.query.limit || DEFAULT_LIMIT

    try {
        const response = await ReportService.bestClients(start, end, limit)
        res.json(response)
    } catch (e) {
        return res.status(e.statusCode).json({error: e.message}).end()
    }
}