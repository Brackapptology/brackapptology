const router = require('express').Router();
const { Bracket } = require('../db/models')

router.post('/create', (req, res, next) => {
    Bracket.create(req.body)
        .then(bracket => res.json(bracket))
        .catch(next);
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