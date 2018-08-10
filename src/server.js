const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const Mebo = require('mebo');

// creating an express app
const app = express();

// logging requests to the console
app.use(morgan('dev'));

// auth
passport.use(new BasicStrategy(
  (username, password, authDone) => {
    if (username.valueOf() === 'user'
      && password.valueOf() === '1234'){
      return authDone(null, 'user');
    }
    return authDone(null, false);
  },
));

// setting-up express and mebo to use passport
app.use(passport.initialize());
Mebo.Handler.get('web').addBeforeAuthAction(passport.authenticate('basic', {session: false}));

// enabling restful support in mebo
Mebo.Handler.get('web').restful(app, '/api');

app.get('/', function (req, res) {
  res.send('Auth Example');
})

// starting the server
const port = process.env.PORT || 8080; // set our port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!\n`);
});
