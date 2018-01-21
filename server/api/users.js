const router = require('express').Router()
const { User, Bracket } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    User.findAll({
      attributes: ['id', 'name', 'isAdmin']
    })
      .then(users => res.json(users))
      .catch(next)
  } else {
    res.sendStatus(401)
  }
})

router.get('/:id', (req, res, next) => {
  User.findById(Number(req.params.id))
    .then(user => res.json(user))
    .catch(next);
})

router.put('/:id/edit', (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.id === Number(req.params.id))) {
    User.findById(Number(req.params.id))
      .then(user => user.update(req.body))
      .then(newUser => res.json(newUser))
      .catch(next)
  } else {
    res.sendStatus(401);
  }
})

router.delete('/:id/delete', (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.id === Number(req.params.id))) {
    User.findById(Number(req.params.id))
      .then(user => user.destroy())
      .then(() => res.sendStatus(204))
      .catch(next)
  } else {
    res.sendStatus(401);
  }
})

router.get('/:id/brackets', (req, res, next) => {
  Bracket.findAll({
    where: {
      userId: Number(req.params.id)
    }
  })
    .then(brackets => res.json(brackets))
    .catch(next);
})

router.get('/:id/brackets/:bracketId', async (req, res, next) => {
  let brackets = await Bracket.findAll({
    where: {
      userId: Number(req.params.id)
    }
  })
  res.json(brackets[Number(req.params.bracketId) - 1])
})