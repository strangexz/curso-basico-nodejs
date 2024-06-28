const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const enviroment = require('dotenv').config();

/* Validación de las variables de entorno*/
if (enviroment.error) {
  // Este error debería de detener todo el proceso
  throw new Error('⚠️ No se encontro el archivo .env ⚠️');
}

/* Determinando entorno de ejecución */
const nodeEnv = process.env.NODE_ENV || 'development';

let customLogger;

const timezone = process.env.TIMEZONE;
const logLevel = process.env.LOG_LEVEL;
const logPath = process.env.LOG_PATH;

const tgu = moment().tz(timezone);
const ts = tgu.format().slice(0, 19).replace('T', ' ');

const getLabel = function (callingModule) {
  const parts = callingModule.filename.split(path.sep);
  return path.join(parts[parts.length - 2], parts.pop());
};

/* Mostrando el nivel del log */
console.info(`${ts} - Configurando Logger global [${logLevel}] [Winston]`);

switch (logLevel) {
  case 'silly':
    console.info(ts + ' - Configuring Error Logger...');
    console.info(ts + ' - Configuring Warn Logger...');
    console.info(ts + ' - Configuring Info Logger...');
    console.info(ts + ' - Configuring Verbose Logger...');
    console.info(ts + ' - Configuring Debug Logger...');
    console.info(ts + ' - Configuring Silly Logger...');
    console.info(`${ts} - Logger global configured\n`);
    break;
  case 'debug':
    console.info(ts + ' - Configuring Error Logger...');
    console.info(ts + ' - Configuring Warn Logger...');
    console.info(ts + ' - Configuring Info Logger...');
    console.info(ts + ' - Configuring Debug Logger...');
    console.info(ts + ' - Configuring Verbose Logger...');
    console.info(`${ts} - Logger global configured\n`);
    break;
  case 'verbose':
    console.info(ts + ' - Configuring Error Logger...');
    console.info(ts + ' - Configuring Warn Logger...');
    console.info(ts + ' - Configuring Info Logger...');
    console.info(ts + ' - Configuring Verbose Logger...');
    console.info(`${ts} - Logger global configured\n`);
    break;
  case 'info':
    console.info(ts + ' - Configuring Error Logger...');
    console.info(ts + ' - Configuring Warn Logger...');
    console.info(ts + ' - Configuring Info Logger...');
    console.info(`${ts} - Logger global configured\n`);
    break;
  case 'warn':
    console.info(ts + ' - Configuring Error Logger...');
    console.info(ts + ' - Configuring Warn Logger...');
    console.info(`${ts} - Logger global configured\n`);
    break;
  case 'error':
    console.info(ts + ' - Configuring Error Logger...');
    console.info(`${ts} - Logger global configured\n`);
    break;

  default:
    console.info(`${ts} - Nivel del log no valido: ${logLevel}`);
    break;
}

/* Exportando Logger como función */
module.exports = function (callingModule) {
  /* Crea el directorio de logs si no existiera */
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();
  const mil = today.getMilliseconds();
  const filename = `${year}${month}${day}${hour}${min}${sec}${mil}`;
  const logError = path.join(__dirname, `${logPath}/${filename}_error.log`);
  const logFile = path.join(__dirname, `${logPath}/${filename}_app.log`);

  /* Definiendo el formato del log */
  const formatParams = (info) => {
    const { timestamp, level, message, ...args } = info;
    const label = getLabel(callingModule);
    const msg = `${ts} ${level} [${label}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, '', '') : ''}`;

    return msg;
  };

  /* Asignando configuraciones de formato de acuerdo al ambiente */
  const devFormat = format.combine(format.colorize(), format.timestamp(), format.printf(formatParams));
  const prdFormat = format.combine(format.timestamp(), format.align(), format.printf(formatParams));

  switch (nodeEnv) {
    case 'development':
      customLogger = createLogger({
        level: logLevel,
        format: devFormat,
        transports: [new transports.Console()],
      });
      break;
    case 'test':
      customLogger = createLogger({
        silent: true,
      });
      break;
    default:
      customLogger = createLogger({
        level: logLevel,
        format: fileFormat,
        transports: [
          new transports.DailyRotateFile({
            frequency: '1d',
            filename: '%DATE%_app.log',
            datePattern: 'YYYY-MM-DD-HH-mm-ss',
            dirname: logPath,
            zippedArchive: false,
            auditFile: 'audit.json',
            maxSize: '1m',
            maxFiles: '2d',
          }),
          new transports.Console({
            level: logLevel,
            format: prdFormat,
          }),
        ],
      });
      break;
  }

  return customLogger;
};
