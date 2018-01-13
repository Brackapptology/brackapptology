const router = require('express').Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { espnBPI, espnRPI } = require('../../utils/espn-scraper');

router.get(`/rpi/1`, (req, res, next) => {
    espnRPI(`http://www.espn.com/mens-college-basketball/rpi`, req, res, next)
})
router.get(`/rpi/:pageId`, (req, res, next) => {
    espnRPI(`http://www.espn.com/mens-college-basketball/rpi/_/page/${Number(req.params.pageId) - 1}/sort/RPI`, req, res, next)
})

router.get(`/bpi/:pageId`, (req, res, next) => {
    espnBPI(`http://www.espn.com/mens-college-basketball/bpi/_/view/overview/page/${Number(req.params.pageId)}`, req, res, next)
})

router.get('/bpi/confchamps', (req, res, next) => {
    const options = {
        uri: `http://www.espn.com/mens-college-basketball/bpi/_/view/projections/sort/chancewinconfortie/page/1/dir/desc`,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            const dataArr = [];
            $('tbody tr td').each(function (idx) {
                dataArr.push($(this).text())
            })

            const champs = [];

            for (let i = 0; i < dataArr.length; i += 9) {
                let conf = dataArr[i + 2];
                let team = dataArr[i + 1];

                if (!champs[conf]) {
                    champs.push({ [conf]: team })
                }
            }

            res.json(champs)
        })
})


module.exports = router;
