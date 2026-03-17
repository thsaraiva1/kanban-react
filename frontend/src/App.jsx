import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column.jsx";
import "./App.css";

function App() {

  const API_URL = "https://kanban-react-jfkt.onrender.com";

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const statuses = ["todo", "doing", "done"];

  // 🔹 GET - carregar tarefas do banco
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  // 🔹 POST - criar tarefa
  async function addTask() {
    if (!newTask.trim()) return;

    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    });

    const createdTask = await response.json();

    setTasks([...tasks, createdTask]);
    setNewTask("");
  }

  // 🔹 DELETE - remover tarefa do banco
  async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter(task => task.id !== id));
  }

  // 🔹 PUT - atualizar status (drag and drop)
  async function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const newStatus = over.id;

    await fetch(`${API_URL}/tasks/${active.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    setTasks(tasks.map(task => {
      if (task.id === active.id) {
        return { ...task, status: newStatus };
      }
      return task;
    }));
  }

  return (
    <div className="kanban">

      <h1>Kanban</h1>

      <DndContext onDragEnd={handleDragEnd}>

        <div className="board">
          {statuses.map(status => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter(task => task.status === status)}
              deleteTask={deleteTask}
            />
          ))}
        </div>

      </DndContext>

      <div className="input-area">

        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          placeholder="Nova tarefa"
        />

        <button onClick={addTask}>
          Adicionar
        </button>

      </div>

    </div>
  );
}

export default App;