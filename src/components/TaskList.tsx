import type { TaskType } from "../libs/types"

type TaskListProps = {
  tasks: TaskType[]
  onEdit: (task: TaskType) => void
  onDelete: (id: number) => Promise<void>
}

export default function TaskList({tasks, onEdit, onDelete}: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one to see it here.</p>
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <strong>{task.description}</strong>
          <p>Status: {task.status.replace("_", " ")}</p>
          <p>Due: {task.due_date}</p>

          <div className="task-actions">
            <button className="secondary" onClick={() => onEdit(task)}>
              Edit
            </button>

            <button className="danger" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}