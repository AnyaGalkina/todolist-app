import {v1} from "uuid";
import {
    ADD_TODOLIST,
    REMOVE_TODOLISTID,
    todoListId2,
    todoListId1, SET_TODOLISTS
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolistsAPI";
import {ActionType} from "./store";
import {Dispatch} from "redux";

export type TasksType = {
    [key: string]: Array<TaskType>
}

export const REMOVE_TASK = "app_todolist/tasksReducer/REMOVE_TASK";
export const CHANGE_TASK_STATUS = "app_todolist/tasksReducer/CHANGE_TASK_STATUS";
export const CHANGE_TASK_TITLE = "app_todolist/tasksReducer/CHANGE_TASK_TITLE";
export const ADD_TASK = "app_todolist/tasksReducer/ADD_TASK";
export const SET_TASKS = "app_todolist/tasksReducer/SET_TASKS";


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
            return newState;
        case SET_TODOLISTS:
            let copeState = {...state}
            action.payload.todolists.forEach(t => {
                copeState[t.id] = [];
            })
            return copeState
        case SET_TASKS:
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            };
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

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: SET_TASKS,
        payload: {
            todolistId,
            tasks
        }
    } as const
}

export const fetchTasksThunk = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId).then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
    }
}