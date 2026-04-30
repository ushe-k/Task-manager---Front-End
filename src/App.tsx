import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { useAuthContext } from './utils.py/AuthContext'
import { useTaskContext } from './utils.py/TaskContext'

// Main application component that controls auth and page rendering.

export default function App() {
  const [page, setPage] = useState('login')
  const {isLoggedIn, handleLogout} = useAuthContext()
  const {loadTasks, handleEditTask,handleSaveTask, handleDeleteTask, loading, tasks, selectedTask, onLogout, cancelEdit} = useTaskContext()

  useEffect(() => {
    if (isLoggedIn) {
      loadTasks()
    }
  }, [isLoggedIn])
  

  if (!isLoggedIn) {
    return (
      <div className="page-shell">
        <header>
          <h1>Task Manager</h1>
          <p>Login or register to manage your tasks.</p>
        </header>

        {page === 'login' ? (<LoginForm/>) : (<RegisterForm/>)}

        <div className="page-switch">
          {page === 'login' ? (
            <button onClick={() => setPage('register')}>Go to Register</button>
          ) : (
            <button onClick={() => setPage('login')}>Go to Login</button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <header>
        <h1>My Tasks</h1>
        <div className="header-actions">
          <button className="small-button" onClick={()=>{ handleLogout(), onLogout(), setPage('login')}}>Logout</button>
        </div>
      </header>
      <section className="content-grid">
        <div className="panel">
          <h2>{selectedTask ? 'Edit task' : 'Add new task'}</h2>
          <TaskForm onSave={handleSaveTask} initialTask={selectedTask} onCancel={cancelEdit} />
        </div>
        <div className="panel">
          <div className="list-header">
            <h2>Task list</h2>
            <button className="small-button" onClick={loadTasks}>Refresh</button>
          </div>
          {loading && <p>Loading tasks…</p>}
          <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
        </div>
      </section>
    </div>
  )
}
