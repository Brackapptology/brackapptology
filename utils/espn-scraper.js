const rp = require('request-promise');
const cheerio = require('cheerio');

const espnRPI = (uri, req, res, next) => {
    const options = {
        uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            const dataArr = [];
            $('tbody tr td').each(function (idx) {
                if (idx > 17) {
                    dataArr.push($(this).text())
                }
            })
            let currentRank = 0;
            const rankings = [];
            for (let i = 0; i < dataArr.length; i += 17) {
                let team = dataArr[i + 1];
                let rank = dataArr[i];
                if (rank !== 'RK') {
                    if (i === 0) {
                        currentRank = rank;
                    }
                    if (!rank) {
                        rank = currentRank;
                    }
                    currentRank++;
                    let record = dataArr[i + 3];
                    let t25 = dataArr[i + 9];
                    let t50 = dataArr[i + 10];
                    let t100 = dataArr[i + 11];
                    if (team !== 'TEAM') {
                        rankings.push({
                            team,
                            rpi: rank,
                            record,
                            t25,
                            t50,
                            t100
                        })
                    }
                }
            }
            res.json(rankings)
        })
        .catch((err) => {
            console.log(err);
        });
}

const shaveBPI = (team) => {
    for (let j = team.length - 1; j >= team.length - 5; j--) {
        if (team.startsWith('IUPUI')) {
             team = 'IUPUI';
             break;
        } else if (team.startsWith('Texas A&M-CC')) {
            team = 'Texas A&M-CC';
            break;
        } else if (team === 'North Carolina A&T') {
            break;
        } else if (team.includes('A&M')) {
            const idx = team.indexOf('A&M') + 3;
            team = team.slice(0, idx);
            break;
        }
        else if (team === team.toUpperCase()) {
            team = team.slice(0, team.length / 2)
            break;
        } else if (team[j] !== undefined) {

            if (team[j] !== team[j].toLowerCase()) {
                team = team.slice(0, j)
            } else if (team[j] === '-') {
                team = team.slice(0, j)
            } else {
                break;
            }
        }
    }
    return team;
} 

const espnBPI = (uri, req, res, next) => {
    const options = {
        uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(($) => {
            const dataArr = [];
            $('tbody tr td').each(function (idx) {
                if (idx > 3) {
                    dataArr.push($(this).text())
                }
            })
            const rankings = [];
            for (let i = 0; i < dataArr.length; i += 8) {
                let team = dataArr[i + 1];
                team = shaveBPI(team);
                let rank = dataArr[i];
                let conf = dataArr[i + 2];
                let sos = dataArr[i + 5];
                let sor = dataArr[i + 6];

                rankings.push({
                    team,
                    bpi: rank,
                    conf,
                    sos,
                    sor
                })
            }
            res.json(rankings)
        })
        .catch((err) => {
            console.log(err);
        });
}

const confChamps = (uri, req, res, next) => {
    const options = {
        uri,
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

            const champs = {};

            for (let i = 0; i < dataArr.length; i += 9) {
                let conf = dataArr[i + 2];
                let team = dataArr[i + 1];
                team = shaveBPI(team);
                if (conf == 'MAC W' && !champs[conf]) {
                    champs.MAC = team;
                } else if (conf == 'MAC E' && !champs[conf]) {
                    champs.MAC = team;
                } else if (!champs[conf]) {
                    champs[conf] = team;
                }
            }

            res.json(champs)
        })
}

module.exports = {
    espnRPI,
    espnBPI,
    confChamps
}
