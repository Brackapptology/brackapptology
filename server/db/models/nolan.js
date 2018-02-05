const Sequelize = require('sequelize')
const db = require('../db')

const Nolan = db.define('nolan', {
  data: Sequelize.JSON
})

module.exports = Nolan;