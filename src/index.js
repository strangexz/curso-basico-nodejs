const express = require('express');
const enviroment = require('dotenv').config();

const log = require('./api/config/logger')(module)
const accessLogger = require('../src/api/config/accessLogger');

/* Implementación de express */
const app = express();

/* Iniciando enrutador */
const router = express.Router();

/* Validación de las variables de entorno*/
if (enviroment.error) {
  // Este error debería de detener todo el proceso
  throw new Error('⚠️ No se encontro el archivo .env ⚠️');
}

/* Determinando entorno de ejecución */
const nodeEnv = process.env.NODE_ENV || 'development';

/* Configurando el logger de acceso */
if (nodeEnv === 'development') {
  app.use(accessLogger.accessLoggerSuccess);
  app.use(accessLogger.accessLoggerError);
} else {
  app.use(accessLogger.accessLoggerCombined);
}

/* Configurando rcuerpo de la solicitud */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Cargar rutas */
const apiRoutes = require('./api/routes');

/* Implementando rutas */
app.use('/nodeCourse', router, apiRoutes);

const port = process.env.PORT_SERVER;
const message = `El API REST en Node JS arrancó en el puerto: ${port}`;

/*SECTION - Arrancando el servidor */
app.listen(port, () => {
  log.info('******************************************************************************')
  log.info('************************ API CURSO DE NODEJS BASICO **************************')
  log.info('******************************************************************************')
  log.info(message);
});
