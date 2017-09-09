'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const path = require('path');
const passport = require('passport');
const SpotifyStrategy = require('../lib/passport-spotify/index').Strategy;
const session = require('express-session');
const User = require('../db/models/user')
// const store = require('../app/store')



const pkg = require('../package.json')


const app = express()
var appKey = ''
var appSecret = ''

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and spotify
//   profile), and invoke a callback with a user object.
passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://localhost:8888/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log('Profile: ', profile)

      User.findOrCreate({
        where: {
          SpotifyId: profile.id
        },
        defaults: {
          name: profile.displayName,
          SpotifyId: profile.id,
          accessToken: accessToken,
          proPic: profile.photos[0],
          refreshToken: refreshToken
        }
      })
      .spread(function (user) {
        console.log('MAKING USER: ', user)

        done(null, user);
      })
      .catch(done);
      // return done(null, profile);
    });
  }));

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
}  

app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(session({ secret: 'keyboard cat', resave: false,
saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: [ 'user-read-email','playlist-modify-private', 'playlist-modify-public'], showDialog: true}),
  function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
});

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('IN CALLBACK: ')
    res.redirect('/profile');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


//The code below works because `.use` returns `this` which is `app`. So what we want to return in the `module.exports` is `app`, and we can chain on that declaration because each method invokation returns `app` after mutating based on the middleware functions
module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  .use('/api', require('./api')) // Serve our api
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))) // Send index.html for any other requests.

  // notice the use of `_` as the first parameter above. This is a pattern for parameters that must exist, but you don't use or reference (or need) in the function body that follows.

if (module === require.main) {
  // Start listening only if we're the main module.

  /* 
    https://nodejs.org/api/modules.html#modules_accessing_the_main_module
      - This (module === require.main) will be true if run via node foo.js, but false if run by require('./foo')
      - If you want to test this, log `require.main` and `module` in this file and also in `api.js`. 
        * Note how `require.main` logs the same thing in both files, because it is always referencing the "main" import, where we starting running in Node 
        * In 'start.js', note how `module` is the same as `require.main` because that is the file we start with in our 'package.json' -- `node server/start.js`
        * In 'api.js', note how `module` (this specific file - i.e. module) is different from `require.main` because this is NOT the file we started in and `require.main` is the file we started in
          ~ To help compare these objects, reference each of their `id` attributes
  */
  const server = app.listen(
    process.env.PORT || 8888,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`)      
      console.log(`Listening on ${JSON.stringify(server.address())}`)
    }
  )
  const io = require('socket.io')(server);
  require('./socket')(io);
}
