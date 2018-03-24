const rp = require('request-promise');
const cheerio = require('cheerio');
const { KPI } = require('../server/db/models');

const convertKPItoRPI = (team) => {
  switch (team) {
    case 'Miami (FL)':
      return 'Miami';
    case "St. Mary's (CA)":
      return "St. Mary's";
    case 'Loyola (Chicago)':
      return 'Loyola-Chicago';
    case 'Central Florida':
      return 'UCF';
    case 'North Carolina State':
      return 'NC State';
    case 'Mississippi':
      return 'Ole Miss';
    case 'UC-Santa Barbara':
      return 'UC Santa Barbara';
    case 'UNC-Greensboro':
      return 'UNC Greensboro';
    case 'UC-Davis':
      return 'UC Davis';
    case 'Portland State':
      return 'Portland St';
    case 'UNC-Asheville':
      return 'UNC Asheville';
    case 'Cal State-Fullerton':
      return 'CS Fullerton';
    case 'Hawaii':
      return "Hawai'i";
    case 'MD-Baltimore County':
      return 'UMBC';
    case 'Texas-Arlington':
      return 'UT Arlington';
    case 'UC-Irvine':
      return 'UC Irvine';
    case 'Penn':
      return 'Pennsylvania';
    case 'IPFW':
      return 'Fort Wayne';
    case 'Nicholls State':
      return 'Nicholls';
    case 'Southeastern Louisiana':
      return 'SE Louisiana';
    case 'Cal State-Bakersfield':
      return 'CSU Bakersfield';
    case 'Texas-Rio Grande Valley':
      return 'UT Rio Grande Valley';
    case 'SE Missouri State':
      return 'Southeast Missouri State';
    case 'Nebraska-Omaha':
      return 'Omaha';
    case 'St. Peter’s':
      return "Saint Peter's";
    case 'Illinois-Chicago':
      return 'UIC';
    case 'Texas-San Antonio':
      return 'UT San Antonio';
    case 'Mount St. Mary’s':
      return "Mt. St. Mary's";
    case 'UNC-Wilmington':
      return 'UNC Wilmington';
    case 'St. Francis (NY)':
      return 'St. Francis (BKN)';
    case 'Prairie View':
      return 'Prairie View A&M';
    case 'Detroit':
      return 'Detroit Mercy';
    case 'Tennessee-Martin':
      return 'Tenn-Martin';
    case 'LIU-Brooklyn':
      return 'LIU Brooklyn';
    case 'Louisiana-Monroe':
      return 'UL Monroe';
    case 'McNeese State':
      return 'McNeese';
    case 'Florida International':
      return 'Florida Intl';
    case 'UC-Riverside':
      return 'UC Riverside';
    case 'MD-Eastern Shore':
      return 'Maryland-Eastern Shore';
    case 'USC-Upstate':
      return 'South Carolina Upstate';
    case 'TAMU-Corpus Christi':
      return 'Texas A&M-CC';
    case 'Cal State-Northridge':
      return 'CSU Northridge';
    case 'Louisiana-Lafayette':
      return 'Louisiana';
    case 'College of Charleston':
      return 'Charleston';
    default:
      return team;
  }
}

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

      
      const rankings = [];
      for (let i = 0; i < dataArr.length; i += 19) {
        let team = convertKPItoRPI(dataArr[i + 1]);
        let rank = dataArr[i];
        let top50 = dataArr[i + 8];
        let home = dataArr[i + 9];
        let awayNeutral = dataArr[i + 10];
        let kpiSOS = dataArr[i + 12];
        
        rankings.push({
          team,
          kpi: rank,
          top50,
          home,
          awayNeutral,
          kpiSOS
        })
      }
      
      KPI.findOrCreate({
        where: { id: 1 }
      })
        .spread((kpi, isCreated) => {
          if (!isCreated) {
            kpi.update({ data: rankings })
          }
        })
        // .then(data => res.json(data))
        .catch(console.error)
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { kpiScrape, convertKPItoRPI }