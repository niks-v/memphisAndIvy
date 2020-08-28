let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let favicon = require('serve-favicon');
require('dotenv').config()
let hbs = require('hbs');
let fs = require('fs');

// Helpers
let partialsDir = __dirname + '/views/partials';
let filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
  let matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  let name = matches[1];
  let template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});

let indexRouter = require('./routes/index');
let abtRouter = require('./routes/about');
let cartRouter = require('./routes/cart');
let categoryRouter = require('./routes/category');
let productRouter = require('./routes/product');
let checkoutRouter = require('./routes/checkout');
let adminRouter = require('./routes/admin');
let orderRouter = require('./routes/placeOrder');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// put routers here
app.use('/', indexRouter);
app.use('/about', abtRouter);
app.use('/cart', cartRouter);
app.use('/category/*', categoryRouter);
app.use('/product/*', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/admin', adminRouter);
app.use('/placeorder', orderRouter);

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

// Create the server
module.exports = app;
