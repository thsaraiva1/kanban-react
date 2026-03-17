
const db = require("../database/db");


async function getAllTasks(){
   const result = await db.query("SELECT * FROM tasks ORDER BY id");
   return result.rows;
}

async function createTask(title) {
   const result = await db.query(
      "INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *",
      [title, "todo"]
   );

   return result.rows[0];
}

async function deleteTask(id) {
   await db.query("DELETE FROM tasks WHERE id = $1", [id]);
}

async function updateTask(id, status) {
   const result = await db.query(
      "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
   );

   return result.rows[0];
}

module.exports = {
   getAllTasks,
   createTask,
   deleteTask,
   updateTask
};