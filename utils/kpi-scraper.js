const rp = require('request-promise');
const cheerio = require('cheerio');

const kpiScrape = (req, res, next) => {
    const options = {
        uri: 'http://www.kpisports.net/d-i_mbb/2018kpi-d1mbb/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            const dataArr = [];
            $('td').each(function (idx) {
                dataArr.push($(this).text())
            })

            const rankings = {};
            for (let i = 0; i < dataArr.length; i += 17) {
                let team = dataArr[i + 1];
                let rank = dataArr[i];
                let top50 = dataArr[i + 6];
                let home = dataArr[i + 7];
                let awayNeutral = dataArr[i + 8];
                let sos = dataArr[i + 10];

                rankings[team] = {
                    kpi: rank,
                    top50,
                    home,
                    awayNeutral,
                    sos
                }
            }


            res.json(rankings)
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = kpiScrape;