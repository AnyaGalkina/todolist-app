import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {"api-key": "8cb31c3e-5e62-4d4f-945f-025b0014bebf"}
});

type TodolistType = {
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
	items: DataType<TaskType>[];
	totalCount: number;
	error?: string;
}

export type TaskType = {
    id: string;
    title: string;
    description?: string;
    todoListId: string;
    order: number;
    status: number;
    priority: number;
    startDate?: string;
    deadline?: string;
    addedDate: string;
}


type TaskTypeReq = {
    title: string;
    description: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
}

export const todolistsAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>("/todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<"", AxiosResponse<CommonResType<DataType<TodolistType>>>, { title: string }>("/todo-lists", {title});
    },
    updateTodolistTitle(payload: { todolistId: string, title: string }) {
        return instance.put<"", AxiosResponse<CommonResType>, { title: string }>(`/${payload.todolistId}`, {title: payload.title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResType>(`/todo-lists/${todolistId}`);
    },
    getTasks(todolistId: string) {
        return instance.get<TaskGetResType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(p: { todolistId: string, title: string}) {
        return instance.post<CommonResType<DataType<TaskType>>>(`/todo-lists/${p.todolistId}/tasks`, {title: p.title});
    },
    updateTask(payload: {todolistId: string, taskId: string, task: TaskTypeReq }
    ) {
        return instance.put<CommonResType>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`, {...payload.task});
    },
    deleteTask(payload: { todolistId: string, taskId: string}) {
        return instance.delete<CommonResType>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`);
    }
}

