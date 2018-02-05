const router = require('express').Router();
const nolanScrape = require('../../utils/nolan-scraper');
const { Nolan } = require('../db/models');

router.put('/', (req, res, next) => {
  nolanScrape(req, res, next)
})

router.get('/', (req, res, next) => {
  Nolan.findById(1)
    .then(nolan => res.json(nolan.data))
    .catch(next)
})

module.exports = router;