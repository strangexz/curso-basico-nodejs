const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log(
    "Hola mundo!!! El API REST en Node JS arrancó en el puerto: 3000"
  );
});
