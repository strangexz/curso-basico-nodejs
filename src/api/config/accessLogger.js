const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
require('dotenv').config();

/* Determinando entorno de ejecución */
const nodeEnv = process.env.NODE_ENV || 'development';

let accessLoggerCombined;
let accessLoggerSuccess;
let accessLoggerError;

accessLoggerError = morgan('dev', {
  skip: (req, res) => {
    return res.statusCode < 400;
  },
  stream: process.stderr,
});

accessLoggerSuccess = morgan('dev', {
  skip: (req, res) => {
    return res.statusCode >= 400;
  },
  stream: process.stdout,
});

if (nodeEnv !== 'development') {
  const logPath = process.env.LOG_PATH;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();
  const mil = today.getMilliseconds();
  const filename = `${year}${month}${day}${hour}${min}${sec}${mil}_access.log`;

  const accessLogStream = rfs.createStream(filename, {
    interval: '1d', // rotación diaria
    path: path.join(__dirname, logPath),
  });

  accessLoggerCombined = morgan('combined', { stream: accessLogStream });
} else {
  accessLoggerCombined = morgan('combined');
}

module.exports = { accessLoggerCombined, accessLoggerSuccess, accessLoggerError };
