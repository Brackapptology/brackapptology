const Sequelize = require('sequelize')
const db = require('../db')

const BPI = db.define('bpi', {
  data: Sequelize.JSON
})

module.exports = BPI;