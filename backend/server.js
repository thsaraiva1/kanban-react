

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

