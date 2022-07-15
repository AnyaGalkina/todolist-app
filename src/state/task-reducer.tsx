import {TasksType} from "../App";
import {v1} from "uuid";
import {ADD_TODOLIST, REMOVE_TODOLISTID,  RemoveTodolistType,  AddTodolistType } from "./todolist-reducer";

export const REMOVE_TASK = "REMOVE_TASK";
export const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS";
export const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";
export const ADD_TASK = "ADD_TASK";

type ActionType = RemoveTaskType | ChangeTaskStatusType | ChangeTaskTitleType | AddTaskType |  AddTodolistType  | RemoveTodolistType;

type RemoveTaskType = ReturnType<typeof removeTaskAC>;
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
type AddTaskType = ReturnType<typeof addTaskAC>


export const TaskReducer = (state: TasksType, action: ActionType ): TasksType => {
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
                    t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
            };
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                    t.id === action.payload.taskId ? {...t, taskTitle: action.payload.taskTitle} : t)
            };
        case ADD_TASK:
            let newTask = {id: v1(), taskTitle: action.payload.taskTitle, isDone: false};
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

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const
}


export const changeTaskTitleAC = (todolistId: string, taskId: string, taskTitle: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        payload: {
            todolistId,
            taskId,
            taskTitle
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
