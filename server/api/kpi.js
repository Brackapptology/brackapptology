const router = require('express').Router();
const kpiScrape = require('../../utils/kpi-scraper');

router.get('/', (req, res, next) => {
    kpiScrape(req, res, next)
})

module.exports = router;