// require('dotenv').config(); // later for env variables we need.
require('dotenv').config();
const express = require('express');
const path = require('path');
// express-validator is a wrapper around validator.js that validates and sanitizes string inputs. In production, your users will try to type in all kinds of nonsense into your forms --- even things your site wasn't intended to deal with! express-validator plugs into the Express.js ecosystem and helps keep you and your code safe.
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser'); //this basically allows us to get the request body from each well, request.
const logger = require('morgan');
const jwt = require('jsonwebtoken');

const app = express();
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: require("handlebars-helpers")()
}));
app.set('view engine', 'hbs');

// database connection
require('./data/handy-skilled-db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '../public'));

// require routers (mountable route handlers. This instead of passing in the whole app to each module.)
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const checkAuth = require('./middleware/checkAuth');
// specific custom auth checking middleware.

// app.use(checkAuth);
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', checkAuth);

// error handler - later.
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// for heroku
const port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;
