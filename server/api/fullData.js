const router = require('express').Router();
const { FullData } = require('../db/models');

router.get('/', (req, res, next) => {
  FullData.findById(1)
    .then(data => res.json(data.data))
    .catch(next)
})

module.exports = router;
