const router = require('express').Router();
const { Bracket } = require('../db/models')

router.post('/create', (req, res, next) => {
    // console.log('user: ', req.user)
    // console.log('session: ', req.session)
    if (req.user) {
        Bracket.create({
            field: req.body.field,
            lastFour: req.body.lastFour,
            bubblePop: req.body.bubblePop,
            userId: req.user.id
        })
            .then(bracket => res.json(bracket))
            .catch(next);
    }
})

router.delete('/:bracketId/delete', (req, res, next) => {
    Bracket.destroy({
        where: {
            id: Number(req.params.bracketId)
        }
    })
        .then(() => res.sendStatus(204).end())
        .catch(next);
})

module.exports = router;