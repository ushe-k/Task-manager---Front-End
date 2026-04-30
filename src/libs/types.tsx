export interface TaskType{
    id: number;
    description: string;
    due_date: string;
    status: string;
}

export type CreateTask = {
    id?: number
    description: string
    due_date: string
    status: string
}