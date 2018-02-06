const nolanScrape = require('./nolan-scraper');
const { kpiScrape } = require('./kpi-scraper');
const { espnBPI } = require('./espn-scraper');
const { BPI, KPI, Nolan, FullData } = require('../server/db/models');
const combineMetrics = require('../utils/combineMetrics');

const scrape = () => {
  nolanScrape();
  kpiScrape();

  for (let i = 1; i <= 15; i++) {
    espnBPI(`http://www.espn.com/mens-college-basketball/bpi/_/view/overview/page/${i}`, i)
  }
}

const seed = async () => {
  await scrape();
  let bpiEntries = await BPI.findAll()
  let bpi = []
  bpiEntries.forEach(entry => {
    bpi = bpi.concat(entry.data)
  })
  let kpi = await KPI.findById(1)
  let nolan = await Nolan.findById(1)

  let data = combineMetrics(bpi, kpi.data, nolan.data);

  FullData.findOrCreate({
    where: { id: 1 }
  })
    .spread((fullData, isCreated) => {
      if (!isCreated) {
        fullData.update({ data })
        console.log('pulled data');
      }
    })
    .catch(console.error)
}

module.exports = seed;