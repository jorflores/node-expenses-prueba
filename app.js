const express = require("express");
const dotenv = require("dotenv");
const expensesRoute = require("./routes/expenses");
const managementRoute = require("./routes/management");
const fileManagementRoute = require("./routes/filemanagement");

var cors = require("cors");

dotenv.config();

const port = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/expenses", expensesRoute);
app.use("/api/management", managementRoute);
app.use("/api/save-excel-data", fileManagementRoute);

app.listen(port, function () {
  console.log(`Servidor en el puerto ${port} `);
});
