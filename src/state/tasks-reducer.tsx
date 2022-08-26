import {ADD_TODOLIST, REMOVE_TODOLISTID, SET_TODOLISTS} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {ActionType} from "./types/types";
import {AppRootState} from "./store";

export type TasksType = {
    [key: string]: Array<TaskType>
}

export const REMOVE_TASK = "app_todolist/tasksReducer/REMOVE_TASK";
export const UPDATE_TASK = "app_todolist/tasksReducer/UPDATE_TASK";
export const ADD_TASK = "app_todolist/tasksReducer/ADD_TASK";
export const SET_TASKS = "app_todolist/tasksReducer/SET_TASKS";


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
    debugger

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
    ({type: UPDATE_TASK, payload: {todolistId, taskId, task}} as const)
export const addTaskAC = (todolistId: string, task: TaskType) =>
    ({type: ADD_TASK, payload: {todolistId, task}} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: SET_TASKS, payload: {todolistId, tasks}} as const)


//Thunks
export const getTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}

export const removeTaskThunk = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask({todolistId, taskId})
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}

export const addTaskThunk = (payload: { todolistId: string, title: string }) => (dispatch: Dispatch<ReturnType<typeof addTaskAC>>) => {
    todolistsAPI.createTask(payload)
        .then((res) => {
            dispatch(addTaskAC(payload.todolistId, res.data.data.item))
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

export const updateTaskThunk = (todolistId: string, taskId: string, model: UpdateModuleType) => (dispatch: Dispatch, getState: () => AppRootState) => {
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
                dispatch(updateTaskAC(todolistId, taskId, res.data.data.item));
            })
    }
}