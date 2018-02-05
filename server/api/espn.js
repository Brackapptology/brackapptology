const router = require('express').Router();
const { espnBPI, espnRPI, confChamps } = require('../../utils/espn-scraper');
const { BPI } = require('../db/models');

router.put(`/bpi/:pageId`, (req, res, next) => {
  let id = Number(req.params.pageId)
  espnBPI(`http://www.espn.com/mens-college-basketball/bpi/_/view/overview/page/${id}`, id, req, res, next)
})

router.get(`/bpi`, (req, res, next) => {
  BPI.findAll()
    .then(bpiEntries => {
      let bpi = [];
      bpiEntries.forEach((entry, idx) => {
        bpi = bpi.concat(entry.data)
      })
      res.json(bpi)
    })
    .catch(next)
})

module.exports = router;
