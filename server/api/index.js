const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/espn', require('./espn'));
router.use('/bracket', require('./bracket'));
router.use('/kpi', require('./kpi'));
router.use('/nolan', require('./nolan'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
