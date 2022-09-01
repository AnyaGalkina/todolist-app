import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {"api-key": "8cb31c3e-5e62-4d4f-945f-025b0014bebf"}
});

// applyMiddleware(thunk)

export const todolistsAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>("/todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<"", AxiosResponse<CommonResType<DataType<TodolistType>>>, { title: string }>("/todo-lists", {title});
    },
    updateTodolistTitle(payload: { todolistId: string, title: string }) {
        return instance.put<"", AxiosResponse<CommonResType>, { title: string }>(`/todo-lists/${payload.todolistId}`, {title: payload.title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResType>(`/todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<TaskGetResType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(p: { todolistId: string, title: string }) {
        return instance.post<CommonResType<DataType<TaskType>>>(`/todo-lists/${p.todolistId}/tasks`, {title: p.title});
    },
    updateTask(payload: { todolistId: string, taskId: string, model: UpdateModel }
    ) {
        debugger
        return instance.put<CommonResType<DataType<TaskType>>>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`, {...payload.model});
    },
    deleteTask(payload: { todolistId: string, taskId: string }) {
        return instance.delete<CommonResType>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`);
    }
}

//types
export type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
}
type DataType<D> = {
    item: D
}
type CommonResType<T = {}> = {
    resultCode: number;
    messages: string[];
    fieldsErrors: string[];
    data: T;
}
export type TaskGetResType = {
    items: TaskType[];
    totalCount: number;
    error?: string;
}
export enum TaskStatuses {
    New = 0,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string;
    title: string;
    description: string;
    todoListId: string;
    order: number;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    addedDate: string;
}
type UpdateModel = {
    title: string;
    description: string;
    // completed: boolean;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
}


