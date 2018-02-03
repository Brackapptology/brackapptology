const router = require('express').Router();
const { espnBPI, espnRPI, confChamps } = require('../../utils/espn-scraper');

router.get(`/bpi/:pageId`, (req, res, next) => {
    espnBPI(`http://www.espn.com/mens-college-basketball/bpi/_/view/overview/page/${Number(req.params.pageId)}`, req, res, next)
})

module.exports = router;
