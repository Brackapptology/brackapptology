const router = require('express').Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { espnBPI, espnRPI, confChamps } = require('../../utils/espn-scraper');

router.get(`/rpi/1`, (req, res, next) => {
    espnRPI(`http://www.espn.com/mens-college-basketball/rpi`, req, res, next)
})
router.get(`/rpi/:pageId`, (req, res, next) => {
    espnRPI(`http://www.espn.com/mens-college-basketball/rpi/_/page/${Number(req.params.pageId) - 1}/sort/RPI`, req, res, next)
})
router.get('/bpi/confchamps/:pageId', (req, res, next) => {
    confChamps(`http://www.espn.com/mens-college-basketball/bpi/_/view/projections/sort/chancewinconfortie/page/${Number(req.params.pageId)}/dir/desc`, req, res, next);
})

router.get(`/bpi/:pageId`, (req, res, next) => {
    espnBPI(`http://www.espn.com/mens-college-basketball/bpi/_/view/overview/page/${Number(req.params.pageId)}`, req, res, next)
})



module.exports = router;
