const express = require("express");
const path = require("path");
const _ = require('underscore');
const validator = require('validator');
const enviroment = require("dotenv").config();

const data = require("./data/data.json");

/* Implementación de express */
const app = express();

/* Validación de las variables de entorno*/
if (enviroment.error) {
  // Este error debería de detener todo el proceso
  throw new Error("⚠️ No se encontro el archivo .env ⚠️");
}

const port = process.env.PORT_SERVER;
const message = `Hola mundo!!! El API REST en Node JS arrancó en el puerto: ${port}`;

/* Configurando cuerpo de la solicitud */
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/index.html"));
});

/* Devolviendo data de prueba */
app.get("/basic/getOperations", (req, res) => {
  console.log("entrando a la ruta /basic/getOperations...");
  return res.status(200).json(data);
});

/* Sumando 2 números */
app.post("/basic/addition", (req, res) => {
  console.log("Entrando a la ruta /basic/addition...");
  const response = {};

  /* Validando el campo num1 */
  if (_.isUndefined(req.body.num1)) {
    response['message'] = "El campo num1 requerido";

    return res.status(400).json(response);
  }

  if (!_.isNumber(req.body.num1)) {
    response['message'] = "El campo num1 debe ser un número";

    return res.status(400).json(response);
  }

  if (_.isUndefined(req.body.num2)) {
    response['message'] = "Campo num2 requerido";

    return res.status(400).json(response);
  }

  if (!_.isNumber(req.body.num2)) {
    response['message'] = "El campo num2 debe ser un número";

    return res.status(400).json(response);
  }

  const num1 = req.body.num1;
  const num2 = req.body.num2;

  const total = num1 + num2;

  response['num1'] = num1;
  response['num2'] = num2;
  response['total'] = total;

  return res.status(200).json(response);
});

/* Multiplicar 2 números */
app.put("/basic/multiply", (req, res) => {
  console.log("Entrando a la ruta /basic/multiply...");
  const response = {};

  /* Validando el campo num1 */
  if (_.isUndefined(req.body.num1)) {
    response['message'] = "El campo num1 requerido";

    return res.status(400).json(response);
  }

  if (!_.isNumber(req.body.num1)) {
    response['message'] = "El campo num1 debe ser un número";

    return res.status(400).json(response);
  }

  if (_.isUndefined(req.body.num2)) {
    response['message'] = "Campo num2 requerido";

    return res.status(400).json(response);
  }

  if (!_.isNumber(req.body.num2)) {
    response['message'] = "El campo num2 debe ser un número";

    return res.status(400).json(response);
  }

  const num1 = req.body.num1;
  const num2 = req.body.num2;

  const product = num1 * num2;

  response['num1'] = num1;
  response['num2'] = num2;
  response['product'] = product;

  return res.status(200).json(response);
});

/*SECTION - Arrancando el servidor */
app.listen(port, () => {
  console.log(message);
});
