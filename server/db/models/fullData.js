const Sequelize = require('sequelize')
const db = require('../db')

const FullData = db.define('fulldata', {
  data: Sequelize.JSON
})

module.exports = FullData;