import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './utils.py/AuthContext.tsx'
import { TaskProvider } from './utils.py/TaskContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <App/>
      </TaskProvider>
    </AuthProvider>
  </StrictMode>,
)
