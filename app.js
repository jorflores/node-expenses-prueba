const express = require("express");
const dotenv = require("dotenv");
const expensesRoute = require("./routes/expenses");
var cors = require("cors");

dotenv.config();

app.use(cors());

const port = process.env.PORT || 5000;
const app = express();

app.use("/api/expenses", expensesRoute);

app.listen(port, function () {
  console.log(`Servidor en el puerto ${port} `);
});
