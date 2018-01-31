const router = require('express').Router();
const nolanScrape = require('../../utils/nolan-scraper');

router.get('/', (req, res, next) => {
    nolanScrape(req, res, next)
})

module.exports = router;