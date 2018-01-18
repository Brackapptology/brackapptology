const Sequelize = require('sequelize')
const db = require('../db')

const Bracket = db.define('bracket', {
    field: Sequelize.JSON,
    lastFour: Sequelize.JSON,
    bubblePop: Sequelize.JSON,
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
})

module.exports = Bracket;
