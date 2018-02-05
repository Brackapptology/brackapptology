const User = require('./user');
const Bracket = require('./bracket');
const Nolan = require('./nolan');
const KPI = require('./kpi');
const BPI = require('./bpi');
const FullData = require('./fullData');

User.hasMany(Bracket);
Bracket.belongsTo(User);

module.exports = {
  User,
  Bracket,
  Nolan,
  KPI,
  BPI,
  FullData
}
