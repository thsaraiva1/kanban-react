import { useDroppable } from "@dnd-kit/core";
import Task from "./Task.jsx";

function Column({ status, tasks, deleteTask }) {

  const statusLabels = {
    todo: "A Fazer",
    doing: "Em Progresso",
    done: "Concluído"
  }

  const { setNodeRef } = useDroppable({
    id: status
  });

  return (

    <div className="column" ref={setNodeRef}>


      <h2>{statusLabels[status]}</h2>

      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
        />
      ))}

    </div>

  );
}

export default Column;