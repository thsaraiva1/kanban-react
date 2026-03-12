
const tasks = require("../models/tasksModel");

function createTask(req, res){
 
    if (!req.body.title) {
     return res.json({ error: "Título nao informado"});
    }


    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        status: "todo"
    };
    

    tasks.push(newTask);

    res.json(newTask);

}

function deleteTask(req, res) {

    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.json({ error: "Task nao deletada"});
    }

    tasks.splice(index, 1);

    res.json({ message: "Task deletada"});
}

function getTasks(req, res){
    res.json(tasks)
}

function updateTask(req, res) {

  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.json({ error: "Task not found" });
  }

  task.status = req.body.status;

  res.json(task);
}


module.exports = { getTasks, createTask, deleteTask, updateTask };