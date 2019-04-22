var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
const SQL = require('sql-template-strings')
require ('dotenv').config();

//sql config
const db = mysql.createConnection({
  host: process.env.SQLHOST,
  user: process.env.SQLUSER,
  password: process.env.SQLPASS,
  database: process.env.SQLDB,
  multipleStatements: true
});

//sql connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;

//routers
const {getHomePage} = require('./routes/index.js');
const {getAddRecordPage, addRecordDb, getEditRecordPage, editRecordDb, deleteRecordDb} = require('./routes/recordsCrud.js');
const {getAddCustomerPage, addCustomerDb, getEditCustomerPage, editCustomerDb, deleteCustomerDb} = require('./routes/customersCrud.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Home Page
app.get('/', getHomePage);
//Records GET
app.get('/add-record', getAddRecordPage);
app.get('/edit-record/:id', getEditRecordPage);
app.get('/delete-record/:id', deleteRecordDb);
//Records POST
app.post('/add-record', addCustomerDb);
app.post('/edit-record/:id', editCustomerDb);

//Customers GET
app.get('/add-customer', getAddCustomerPage);
app.get('/edit-customer/:id', getEditCustomerPage);
app.get('/delete-customer/:id', deleteCustomerDb);
//Customers POST
app.post('/add-customer', addCustomerDb);
app.post('/edit-customer/:id', editCustomerDb);



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
