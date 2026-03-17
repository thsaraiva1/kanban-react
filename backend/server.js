
require("dotenv").config();
console.log(process.env.DATABASE_URL);

const db = require("./database/db");

db.query("SELECT NOW()")
  .then(res => console.log(res.rows))
  .catch(err => console.error(err));

const express = require("express");
const cors = require("cors");

const app = express();

const tasksRoutes = require("./routes/tasks");

app.use(cors());
app.use(express.json());

app.use(tasksRoutes);

app.listen(5000, () => {
    console.log("Servidor rodando");
});