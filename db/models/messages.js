
var Sequelize = require('sequelize')
var db = require('../index.js')

module.exports = db.define('messages', {
  body: Sequelize.TEXT,
})