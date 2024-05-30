const express = require("express");
const path = require('path');
const enviroment = require("dotenv").config();

const data = require('./data/data.json');

/* Implementación de express */
const app = express();

/* Validación de las variables de entorno*/
if (enviroment.error) {
  // Este error debería de detener todo el proceso
  throw new Error("⚠️ No se encontro el archivo .env ⚠️");
}

const port = process.env.PORT_SERVER;
const message = `Hola mundo!!! El API REST en Node JS arrancó en el puerto: ${port}`;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

/* Devolviendo data de prueba */
app.get("/basic/get", (req, res) => {
  console.log("Devolviendo data de prueba...")
  return res.status(200).json(data);
});

/*SECTION - Arrancando el servidor */
app.listen(port, () => {
  console.log(message);
});
