const express = require('express');
const path = require('path');
const enviroment = require('dotenv').config();

/* Implementación de express */
const app = express();

/* Iniciando enrutador */
const router = express.Router();

/* Validación de las variables de entorno*/
if (enviroment.error) {
  // Este error debería de detener todo el proceso
  throw new Error('⚠️ No se encontro el archivo .env ⚠️');
}

const port = process.env.PORT_SERVER;
const message = `Hola mundo!!! El API REST en Node JS arrancó en el puerto: ${port}`;

/* Configurando cuerpo de la solicitud */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Cargar rutas */
const apiRoutes = require('./api/routes');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

/* Implementando rutas */
app.use('/nodeCourse', router, apiRoutes);

/*SECTION - Arrancando el servidor */
app.listen(port, () => {
  console.log(message);
});
