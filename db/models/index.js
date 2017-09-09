'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')

// Require all the models
	// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db so any other part of the application could call db.model('user') OR db.models.user to get access to the `user` model.
	// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)
	// This is an acceptable pattern but it does have limitations in that if you change the name of the model you will have to change every time it is requeired everywhere

// const User = require('./user')
const Playlist = require('./playlists')

const User = db.define('user', {
  name: Sequelize.STRING,
  SpotifyId: Sequelize.STRING,
  accessToken: Sequelize.STRING,
  proPic: Sequelize.STRING,
  refreshToken: Sequelize.STRING
})

const Friends = db.define('friends', {})

const Message = require('./messages')

const Song = require('./songs');

const Member = require('./members');

User.hasMany(Playlist)
Playlist.belongsTo(User)

User.hasMany(Message);
Playlist.hasMany(Message);

Playlist.hasMany(Song);
// Playlist.belongsTo(Song);
Song.belongsTo(Playlist)

Playlist.hasMany(Member);

User.belongsToMany(User, { through: Friends, as: 'friends' });


module.exports = {
	User: User,
	Playlist: Playlist,
	Message: Message,
	Friends: Friends,
	Member: Member
}
