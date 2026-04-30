import { useContext, createContext, useState, type ReactNode } from "react";
import { createTask, deleteTask, getTasks, updateTask } from "../libs/api";
import type { TaskType } from "../libs/types";

interface TaskContextType {
    loading: boolean;
    tasks: TaskType[];
    selectedTask: TaskType | null;

    loadTasks: () => Promise<void>;
    handleSaveTask: (taskData: TaskType) => Promise<void>;
    handleEditTask: (task: TaskType) => void;
    handleDeleteTask: (taskId: number) => Promise<void>;
    cancelEdit: () => void;
    onLogout: () => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

    const onLogout = () => {
        setTasks([]);
        setSelectedTask(null);
    };

    const cancelEdit = () => {
        setSelectedTask(null);
    };

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("failed to load tasks", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTask = async (taskData: TaskType | TaskType) => {
        try {
            if ("id" in tasks) {
                await updateTask(selectedTask!.id, taskData); 
                setSelectedTask(null);
            } else {
                await createTask(taskData);
            }
        } catch (error) {
            console.error(error);
        }

        await loadTasks();
    };

    const handleEditTask = (task: TaskType) => {
        setSelectedTask(task);
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            await deleteTask(taskId); 
        } catch (error) {
            console.error("failed to delete task", error);
        }

        await loadTasks();
    };

    return (
        <TaskContext.Provider
            value={{
                loading,
                tasks,
                selectedTask,
                loadTasks,
                handleSaveTask,
                handleEditTask,
                handleDeleteTask,
                cancelEdit,
                onLogout,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTaskContext must be used within TaskProvider");
    return context;
};