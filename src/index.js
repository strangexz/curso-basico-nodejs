const express = require("express");
const path = require('path');
const enviroment = require("dotenv").config();

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

/*SECTION - Arrancando el servidor */
app.listen(port, () => {
  console.log(message);
});
