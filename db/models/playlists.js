
var Sequelize = require('sequelize')
var db = require('../index.js')

module.exports = db.define('playlists', {
  name: Sequelize.STRING,
  externalUrl: Sequelize.STRING,
  playlistId: Sequelize.STRING,
  likesNeeded: Sequelize.INTEGER
})
