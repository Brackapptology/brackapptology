const rp = require('request-promise');
const cheerio = require('cheerio');
const { BPI } = require('../server/db/models');

const shaveBPI = (team) => {
  for (let j = team.length - 1; j >= team.length - 5; j--) {
    if (team.startsWith('IUPUI')) {
      team = 'IUPUI';
      break;
    } else if (team.startsWith('Texas A&M-CC')) {
      team = 'Texas A&M-CC';
      break;
    } else if (team.startsWith("Saint Mary's")) {
      team = "St. Mary's";
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

const espnBPI = (uri, id, req, res, next) => {
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

      BPI.findOrCreate({
        where: { id }
      })
        .spread((bpi, isCreated) => {
          if (!isCreated) {
            bpi.update({ data: rankings })
          }
        })
        // .then(data => res.json(data))
        .catch(console.error)
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  espnBPI
}
