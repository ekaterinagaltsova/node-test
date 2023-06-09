const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
require('./middleware/passport')(passport);

const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');

const app = express();

app.use(cors());

app.use(passport.initialize());

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/news', newsRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
