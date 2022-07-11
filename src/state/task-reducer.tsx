import {TasksType} from "../App";
import {v1} from "uuid";
import {ADD_TODOLIST} from "./todolist-reducer";

export const REMOVE_TASK = "REMOVE_TASK";
export const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS";
export const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE";
export const ADD_TASK = "ADD_TASK";
export const ADD_TODOLIST_TO_TASKS = "ADD_TODOLIST_TO_TASKS";
export const REMOVE_TODOLIST_FROM_TASKS = 'REMOVE_TODOLIST_FROM_TASKS';

type ActionType = RemoveTaskType | ChangeTaskStatusType | ChangeTaskTitleType | AddTaskType | AddTodolistToTasksType | RemoveTodolistTromTasksType ;

type RemoveTaskType = ReturnType<typeof removeTaskAC>;
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
type AddTaskType = ReturnType<typeof addTaskAC>
type AddTodolistToTasksType = ReturnType<typeof addTodolistToTasksAC>
type RemoveTodolistTromTasksType = ReturnType<typeof removeTodolistTromTasksAC>


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
                [action.payload.todolistId]: [...state[action.payload.todolistId], newTask]
            };
        case ADD_TODOLIST_TO_TASKS:
            return {
                ...state, [action.payload.newTodolistId]: []
            };
        case REMOVE_TODOLIST_FROM_TASKS:
            delete state[action.payload.todolistId]
            return {...state}
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

export const addTodolistToTasksAC = (newTodolistId: string) => {
    return {
        type: ADD_TODOLIST_TO_TASKS,
        payload: {
            newTodolistId
        }
    } as const
}

export const removeTodolistTromTasksAC = (todolistId: string) => {
    return {
        type: REMOVE_TODOLIST_FROM_TASKS,
        payload: {
            todolistId
        }
    } as const
}