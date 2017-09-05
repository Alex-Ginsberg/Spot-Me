var Sequelize = require('sequelize')
var db = require('../index.js')

const Song = db.define('songs', {
  name: Sequelize.STRING,
  externalUrl: Sequelize.STRING,
  songId: Sequelize.STRING,
  preview_url: Sequelize.STRING,
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  uri: Sequelize.STRING,
  artist: Sequelize.STRING,
  image: Sequelize.STRING
})


module.exports = Song
