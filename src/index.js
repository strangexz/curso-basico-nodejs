const express = require("express");
const enviroment = require('dotenv').config();

const app = express();

if (enviroment.error) {
  // This error should crash whole process
  throw new Error('⚠️ No se encontro el archivo .env ⚠️');
}

const port = process.env.PORT_SERVER;
const message = `Hola mundo!!! El API REST en Node JS arrancó en el puerto: ${port}`;

app.listen(port, () => {
  console.log(message);
});
