const createError = require('http-errors');
const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mySQLstore = require('express-mysql-session')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const { database } = require('./keys');


const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const aulasRouter = require('./routes/aulas');

const app = express();
require('./lib/passport');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
  defaultLayout: "main",
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(session({
  secret: 'aulasmysqlnodejs',
  resave: false,
  saveUninitialized: false,
  store: new mySQLstore(database)
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(flash());
app.use
app.use(express.static(path.join(__dirname, 'public')));

// global variables
app.use((req, res, next) =>{
    app.locals.exito = req.flash('exito');
    next();
});

app.use('/', indexRouter);
app.use('/auth', authenticationRouter);
app.use('/aulas', aulasRouter);

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
