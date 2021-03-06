const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require ('cors');
//const basicAuth = require('./routes/basicAuth');
const errorHandler = require('./errorHandler');
const jwt = require('./helpers/jwt');

const components = require('./routes/components');
const users = require('./routes/users');
const logging = require('./routes/log');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
//app.use(basicAuth);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.all("/api/*", function(req, res, next) {
// 	console.log("here");
// 	  res.header("Access-Control-Allow-Origin", "*");
// 	  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
// 	  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
// 	  return next();
// });

//authentication
app.use(jwt());

//routes
app.use('/api/users', users);
app.use('/api/log', logging);
app.use('/api', components);
app.get('*', (req, res) => {
    res.sendFile('build/index.html', {root: root});
});

//app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;
