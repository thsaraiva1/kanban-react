import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function Task({ task, deleteTask }) {

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform)
  };

  return (

    <div
      ref={setNodeRef}
      style={style}
      className="task"
      {...listeners}
      {...attributes}
    >

      <span>{task.title}</span>

      <button
  className="delete-btn"
  onPointerDown={(e) => e.stopPropagation()}
  onClick={(e) => {
    e.stopPropagation();
    deleteTask(task.id);}}>❌</button>

    </div>

  );
}

export default Task;