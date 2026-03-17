
const tasksModel = require("../models/tasksModel");

async function getTasks(req, res) {
    const tasks = await tasksModel.getAllTasks();
    res.json(tasks);
}

async function createTask(req, res){
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Título obrigatório"});
    }

    const task = await tasksModel.createTask(title);

    res.status(201).json(task);
}

async function deleteTask(req, res) {
    const id = req.params.id;

    await tasksModel.deleteTask(id);

    res.json({ message: "Task deletada"});
}

async function updateTask(req, res) {
    const id = req.params.id;
    const { status } = req.body;

    const task = await tasksModel.updateTask(id, status);

    res.json(task);
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask
 };