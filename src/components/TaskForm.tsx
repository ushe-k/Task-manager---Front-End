import { useEffect, useState, type SyntheticEvent } from 'react'
import type { TaskType, CreateTask } from '../libs/types';

const STATUS_OPTIONS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

interface Props{
  onSave : (task: CreateTask) => Promise<void>
  initialTask: TaskType | null
  onCancel: () => void;
}
// TaskForm handles both creating new tasks and editing existing ones.
export default function TaskForm({ onSave, initialTask, onCancel }: Props) {
  const [description, setDescription] = useState('')
  const [due_date, setDueDate] = useState('')
  const [status, setStatus] = useState('todo')

  useEffect(() => {
    if (initialTask) {
      setDescription(initialTask.description)
      setDueDate(initialTask.due_date)
      setStatus(initialTask.status)
    } else {
      setDescription('')
      setDueDate('')
      setStatus('todo')
    }
  }, [initialTask])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
     await onSave({description, due_date, status })
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Write a short task description"
          required
        />
      </label>
      <label>
        Due date
        <input
          type="date"
          value={due_date}
          onChange={(event) => setDueDate(event.target.value)}
          required
        />
      </label>
      <label>
        Status
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <div className="task-actions">
        <button className="primary" type="submit">
          {initialTask ? 'Update Task' : 'Create Task'}
        </button>
        {initialTask && (
          <button className="secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
