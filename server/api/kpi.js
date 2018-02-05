const router = require('express').Router();
const { kpiScrape } = require('../../utils/kpi-scraper');
const { KPI } = require('../db/models');

router.put('/', (req, res, next) => {
  kpiScrape(req, res, next)
})

router.get('/', (req, res, next) => {
  KPI.findById(1)
    .then(kpi => res.json(kpi.data))
    .catch(next)
})

module.exports = router;