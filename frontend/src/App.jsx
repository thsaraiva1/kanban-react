import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./Column.jsx";
import "./App.css";
import { useEffect } from "react";


function App() {


  useEffect(() => {
    fetch("http://localhost:5000/tasks")
    .then(res => res.json())
    .then(data => setTasks(data));
  }, []);

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const statuses = ["todo", "doing", "done"];

  async function addTask() {

    if (!newTask.trim()) return;

    const response = await fetch('http://localhost:5000/tasks', {
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

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function handleDragEnd(event) {

    const { active, over } = event;

    if (!over) return;

    const newStatus = over.id;

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