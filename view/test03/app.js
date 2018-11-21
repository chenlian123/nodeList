var createError = require('http-errors');//创建错误对象
var express = require('express');
var path = require('path');//路径模块
var cookieParser = require('cookie-parser');//cookiek解析
var logger = require('morgan');//日志

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var openCourses = require('./routes/open-courses');
var vipCourses = require('./routes/vip-courses');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));//日志
app.use(express.json());//獲取ajax傳遞的Json
app.use(express.urlencoded({ extended: false }));//解析url參數
app.use(cookieParser());//cookie解析
//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/open-courses', openCourses);
app.use('/vip-courses', vipCourses);

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
