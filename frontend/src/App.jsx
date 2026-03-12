import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Column from "./column.jsx";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([
    { id: 1, title: "Primeira tarefa", status: "todo" }
  ]);

  const [newTask, setNewTask] = useState("");

  const statuses = ["todo", "doing", "done"];

  function addTask() {

    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      status: "todo"
    };

    setTasks([...tasks, task]);
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