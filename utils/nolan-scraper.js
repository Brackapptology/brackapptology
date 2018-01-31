const rp = require('request-promise');
const cheerio = require('cheerio');

function convertNolanToESPN(team) {
    switch (team) {
        case 'Miami (FL)':
            return 'Miami';
        case "Saint Mary's College":
            return "St. Mary's";
        case 'Saint Bonaventure':
            return 'St. Bonaventure';
        case 'North Carolina State':
            return 'NC State';
        case "Saint John's":
            return "St. John's";
        case 'UNCG':
            return 'UNC Greensboro';
        case 'Cal State Fullerton':
            return 'CS Fullerton';
        case 'Portland State':
            return 'Portland St';
        case 'FGCU':
            return 'Florida Gulf Coast';
        case 'UTA':
            return 'UT Arlington';
        case 'Saint Francis (PA)':
            return 'St. Francis (PA)';
        case "Hawaii":
            return "Hawai'i";
        case 'Penn':
            return 'Pennsylvania';
        case 'IPFW':
            return 'Fort Wayne';
        case 'Southeastern Louisiana':
            return 'SE Louisiana';
        case 'Seattle University':
            return 'Seattle';
        case 'UMass':
            return 'Massachusetts';
        case 'Nicholls State':
            return 'Nicholls';
        case 'FAU':
            return 'Florida Atlantic';
        case 'Cal State Bakersfield':
            return 'CSU Bakersfield';
        case 'Southeast Missouri':
            return 'Southeast Missouri State';
        case 'UTRGV':
            return 'UT Rio Grande Valley';
        case 'UTSA':
            return 'UT San Antonio';
        case "Mount Saint Mary's":
            return "Mt. St. Mary's";
        case 'SIUE':
            return 'SIU-Edwardsville';
        case 'UNCW':
            return 'UNC Wilmington';
        case 'Long Island':
            return 'LIU Brooklyn';
        case 'Loyola-Marymount':
            return 'Loyola Marymount';
        case 'Saint Francis (NY)':
            return 'St. Francis (BKN)';
        case 'ULM':
            return 'UL Monroe';
        case 'Detroit':
            return 'Detroit Mercy';
        case 'Tennessee-Martin':
            return 'Tenn-Martin';
        case 'Presbyterian College':
            return 'Presbyterian';
        case 'Loyola-Maryland':
            return 'Loyola (MD)';
        case 'UMass-Lowell':
            return 'UMass Lowell';
        case 'McNeese State':
            return 'McNeese';
        case 'FIU':
            return 'Florida Intl';
        case 'Maryland Eastern Shore':
            return 'Maryland-Eastern Shore';
        case 'Texas A&M-Corpus Christi':
            return 'Texas A&M-CC';
        case 'Cal State Northridge':
            return 'CSU Northridge';
        default:
            return team;
    }
}

const nolanScrape = (req, res, next) => {
    const options = {
        uri: 'http://warrennolan.com/basketball/2018/nitty-live',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            const dataArr = [];
            $('td').each(function (idx) {
                // console.log($(this).css('background-color'))
                if (idx > 16) {
                    if ($(this).css('background-color') === 'Blue') {
                        dataArr.push(true)
                    } else {
                        dataArr.push($(this).text())
                    }
                }
            })

            const rankings = [];
            for (let i = 0; i < dataArr.length; i += 19) {
                let isChamp = dataArr[i]
                let team = dataArr[i + 2];
                team = team.slice(25);
                let endIdx = team.indexOf('\n');
                team = convertNolanToESPN(team.slice(0, endIdx))
                let record = dataArr[i + 4];
                let rpi = dataArr[i + 5];
                let group1 = dataArr[i + 13];
                let group2 = dataArr[i + 14];
                let group3 = dataArr[i + 15];
                let group4 = dataArr[i + 16];

                rankings.push({
                    team,
                    isChamp,
                    record,
                    rpi,
                    group1,
                    group2,
                    group3,
                    group4
                })
            }


            res.json(rankings)
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = nolanScrape;