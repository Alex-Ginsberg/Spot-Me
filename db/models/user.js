
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('user', {
  name: Sequelize.STRING,
  SpotifyId: Sequelize.STRING,
  accessToken: Sequelize.STRING,
  proPic: Sequelize.STRING,
  refreshToken: Sequelize.STRING
})
