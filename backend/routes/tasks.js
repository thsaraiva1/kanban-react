
const express = require("express");

const router = express.Router();

const { getTasks, createTask, deleteTask, updateTask } = require("../controllers/tasksController");

router.get("/tasks", getTasks);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

module.exports = router;