const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const app = express();
app.use(require('morgan')('combined')); // optional
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'some secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// twitter
passport.use(
  new TwitterStrategy(
    {
      consumerKey: 'aaaaaaaaaa',
      consumerSecret: 'aaaaaaaa',
      callbackURL: 'http://127.0.0.1:3000/callback',
    },
    function(token, tokenSecret, profile, done) {
      profile.access_token = token;
      profile.token_secret = tokenSecret;
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/hello', (req, res) => res.send('world'));

// twitter
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
  res.json({ user: req.user });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = {
  path: '/server',
  handler: app,
};
