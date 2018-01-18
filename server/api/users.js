const router = require('express').Router()
const { User, Bracket } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', async (req, res, next) => {
  if (req.user.id === Number(req.params.id)) {
    Bracket.findAll({
      where: {
        userId: Number(req.params.id)
      }
    })
      .then(brackets => res.json(brackets))
      .catch(next);
  }
  else {
    res.status(401).redirect('/')
  }
})