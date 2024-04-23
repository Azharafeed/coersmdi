var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require("connect-mongo");
const sassMiddleware = require('node-sass-middleware')




var app = express();

app.use(sassMiddleware({
  src: './public/scss',
  dest: './public/stylesheets',
  debug: true,
  outputStyle: 'extended',
  prefix:'/stylesheets'
}))
//express ejs layouts
app.use(expressLayouts)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name:"codeil",
  secret: "blablabla",
  saveUninitialized:false,
  resave:false,
  cookie:{
    maxAge:(1000*60*100)
  },
  store: MongoStore.create(
    {
    mongoUrl: 'mongodb://127.0.0.1:27017/codemeia121',
    autoRemove:'disable'
  },
  function(err){
    console.log(err || 'connect-mongodb setup ok');
  }
  )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
