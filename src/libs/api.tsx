import axios from "axios"
import type { TaskType } from "./types"

const BASE_URL = "https://task-manager-back-end-i27f.onrender.com/api"

// Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Helper to attach token
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}

/* ================= AUTH ================= */

// POST /token/
export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/token/", { username, password })
  return response.data
}

// POST /register/
export const registerUser = async (username: string, password: string) => {
  const response = await api.post("/register/", { username, password })
  return response.data
}

/* ================= TASKS ================= */

// GET /tasks/
export const getTasks = async (): Promise<TaskType[]> => {
  const response = await api.get("/tasks/")
  return response.data
}

// POST /tasks/create/
export const createTask = async (taskData: TaskType) => {
  const response = await api.post("/tasks/create/", taskData)
  return response.data
}

// PUT /tasks/<id>/update/
export const updateTask = async (taskId: number, taskData: TaskType) => {
  const response = await api.put(`/tasks/${taskId}/update/`, taskData)
  return response.data
}

// DELETE /tasks/<id>/delete/
export const deleteTask = async (taskId: number) => {
  const response = await api.delete(`/tasks/${taskId}/delete/`)
  return response.data
}