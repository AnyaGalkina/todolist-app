import {ADD_TODOLIST, REMOVE_TODOLISTID, SET_TODOLISTS} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {ActionType, RESULT_CODES} from "./types/types";
import {AppRootState} from "./store";
import {setAppStatusAC} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type TasksType = {
    [key: string]: Array<TaskType>
}

export const REMOVE_TASK = "TASKS/REMOVE_TASK";
export const UPDATE_TASK = "TASKS/UPDATE_TASK";
export const ADD_TASK = "TASKS/ADD_TASK";
export const SET_TASKS = "TASKS/SET_TASKS";


const initalState: TasksType = {
    // [todoListId1]: [
    //     {
    //         id: v1(),
    //         title: "HTML&CSS",
    //         status: TaskStatuses.Completed,
    //         priority: TaskPriorities.Hi,
    //         startDate: "",
    //         addedDate: "",
    //         deadline: "",
    //         description: "",
    //         order: 0,
    //         todoListId: todoListId1
    //     },
    //     {
    //         id: v1(), title: "JS", status: TaskStatuses.Completed,
    //         priority: TaskPriorities.Hi,
    //         startDate: "",
    //         addedDate: "",
    //         deadline: "",
    //         description: "",
    //         order: 0,
    //         todoListId: todoListId1
    //     },
    //     {
    //         id: v1(), title: "React", status: TaskStatuses.New,
    //         priority: TaskPriorities.Hi,
    //         startDate: "",
    //         addedDate: "",
    //         deadline: "",
    //         description: "",
    //         order: 0,
    //         todoListId: todoListId1
    //
    //     },
    // ],
    // [todoListId2]: [
    //     {
    //         id: v1(), title: "Ride a car",
    //         status: TaskStatuses.New,
    //         priority: TaskPriorities.Hi,
    //         startDate: "",
    //         addedDate: "",
    //         deadline: "",
    //         description: "",
    //         order: 0,
    //         todoListId: todoListId2
    //     },
    //     {
    //         id: v1(), title: "Ride a motorbike", status: TaskStatuses.New,
    //         priority: TaskPriorities.Low,
    //         startDate: "",
    //         addedDate: "",
    //         deadline: "",
    //         description: "",
    //         order: 0,
    //         todoListId: todoListId2
    //     },
    // ]
}

export const tasksReducer = (state: TasksType = initalState, action: ActionType): TasksType => {
    switch (action.type) {
        case ADD_TASK:
            return {...state, [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]]};
        case SET_TASKS:
            return {...state, [action.payload.todolistId]: action.payload.tasks};
        case ADD_TODOLIST:
            return {[action.payload.todolist.id]: [], ...state};
        case REMOVE_TASK :
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            };
        case UPDATE_TASK:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? action.payload.task : t)
            }
        case REMOVE_TODOLISTID:
            let newState = {...state};
            delete newState[action.payload.todolistId];
            return newState;
        case SET_TODOLISTS:
            let copeState = {...state}
            action.payload.todolists.forEach(t => {
                copeState[t.id] = [];
            })
            return copeState
        default:
            return state;
    }
}

//Action creators
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: REMOVE_TASK, payload: {todolistId, taskId}} as const);
export const updateTaskAC = (todolistId: string, taskId: string, task: TaskType) =>
    ({type: UPDATE_TASK, payload: {todolistId, taskId, task}} as const);
export const addTaskAC = (todolistId: string, task: TaskType) =>
    ({type: ADD_TASK, payload: {todolistId, task}} as const);
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: SET_TASKS, payload: {todolistId, tasks}} as const);


//Thunks
export const getTasksThunk = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTaskThunk = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.deleteTask({todolistId, taskId})
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskThunk = (payload: { todolistId: string, title: string }) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.createTask(payload)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(addTaskAC(payload.todolistId, res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

type UpdateModuleType = {
    title?: string;
    description?: string;
    completed?: boolean;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
}

export const updateTaskThunk = (todolistId: string, taskId: string, model: UpdateModuleType) => (dispatch: Dispatch<ActionType>, getState: () => AppRootState) => {
  debugger
    dispatch(setAppStatusAC("loading"))
    const task = getState().tasks[todolistId].find(t => t.id === taskId);

    if (task) {
        todolistsAPI.updateTask({
            todolistId, taskId, model: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.addedDate,
                deadline: task.deadline,
                ...model
            }
        })
            .then((res) => {
                if (res.data.resultCode === RESULT_CODES.succeeded) {
                    dispatch(updateTaskAC(todolistId, taskId, res.data.data.item));
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}