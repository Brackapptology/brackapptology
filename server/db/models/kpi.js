const Sequelize = require('sequelize')
const db = require('../db')

const KPI = db.define('kpi', {
  data: Sequelize.JSON
})

module.exports = KPI;