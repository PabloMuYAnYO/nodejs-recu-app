const createError = require('http-errors');
const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const aulasRouter = require('./routes/aulas');

const app = express();

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// global variables
app.use((req, res, next) =>{

    next();
});

app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);
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
