import {v1} from "uuid";
import {
    ADD_TODOLIST,
    REMOVE_TODOLISTID,
    RemoveTodolistType,
    AddTodolistType,
    todoListId2,
    todoListId1
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolistsAPI";

type ActionType =
    RemoveTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTaskType
    | AddTodolistType
    | RemoveTodolistType;

type RemoveTaskType = ReturnType<typeof removeTaskAC>;
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
type AddTaskType = ReturnType<typeof addTaskAC>

// export type TaskType = {
//     id: string;
//     taskTitle: string;
//     isDone: boolean
// }

export type TasksType = {
    [key: string]: Array<TaskType>
}

export const REMOVE_TASK = "REMOVE_TASK";
export const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS";
export const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";
export const ADD_TASK = "ADD_TASK";


const initalState: TasksType = {
    [todoListId1]: [
        {
            id: v1(),
            title: "HTML&CSS",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            startDate: "",
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            todoListId: todoListId1
        },
        {
            id: v1(), title: "JS", status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            startDate: "",
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            todoListId: todoListId1
        },
        {
            id: v1(), title: "React", status: TaskStatuses.New,
            priority: TaskPriorities.Hi,
            startDate: "",
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            todoListId: todoListId1

        },
    ],
    [todoListId2]: [
        {
            id: v1(), title: "Ride a car",
            status: TaskStatuses.New,
            priority: TaskPriorities.Hi,
            startDate: "",
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            todoListId: todoListId2
        },
        {
            id: v1(), title: "Ride a motorbike", status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: "",
            addedDate: "",
            deadline: "",
            description: "",
            order: 0,
            todoListId: todoListId2
        },
    ]
}

export const tasksReducer = (state: TasksType = initalState, action: ActionType): TasksType => {
    switch (action.type) {
        case REMOVE_TASK :
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            };
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId ? {...t, status: action.payload.status} : t)
            };
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
            };
        case ADD_TASK:
            let newTask = {
                id: v1(), title: action.payload.taskTitle,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: action.payload.todolistId
            };
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
            };
        case ADD_TODOLIST:
            return {
                [action.payload.newTodolistId]: [],
                ...state
            };
        case REMOVE_TODOLISTID:
            // const copy = {...state}
            // const {[action.payload.id]: remove, ...rest} = copy;
            //or!!! const {[action.payload.id]: [], ...rest} = copy;
            // return {...rest}
            let newState = {...state}
            delete newState[action.payload.todolistId]
            return newState
        default:
            return state;
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: REMOVE_TASK,
        payload: {
            todolistId,
            taskId
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {
            todolistId,
            taskId,
            status
        }
    } as const
}


export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        payload: {
            todolistId,
            taskId,
            title
        }
    } as const
}


export const addTaskAC = (todolistId: string, taskTitle: string) => {
    return {
        type: ADD_TASK,
        payload: {
            todolistId,
            taskTitle
        }
    } as const
}

