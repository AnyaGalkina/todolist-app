import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {ActionType} from "./store";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const CHANGE_TODOLIST_TITLE = "app/todolists-reducers/CHANGE_TODOLIST_TITLE"
export const REMOVE_TODOLISTID = "app/todolists-reducers/REMOVE_TODOLISTID";
export const ADD_TODOLIST = "app/todolists-reducers/ADD_TODOLIST";
export const CHANGE_FILTER = "app/todolists-reducers/CHANGE_FILTER";
export const SET_TODOLISTS = "app/todolists-reducers/SET_TODOLISTS";


export const ALL = "all";
export const ACTIVE = "active";
export const COMPLETED = "completed";


export const todoListId1 = v1();
export const todoListId2 = v1();


const initialState: Array<TodolistDomainType> = [
    {id: todoListId1, title: "Learn in Front End", filter: ALL, addedDate: "", order: 0},
    {id: todoListId2, title: "New skills", filter: ALL, addedDate: "", order: 0}
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case CHANGE_TODOLIST_TITLE:
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, title: action.payload.title}
                : t);
        case CHANGE_FILTER:
            return state.map(t => t.id === action.payload.todolistId
                ? {...t, filter: action.payload.filter}
                : t
            );
        case REMOVE_TODOLISTID:
            return state.filter(t => t.id !== action.payload.todolistId);
        case ADD_TODOLIST:
            return [
                {id: action.payload.newTodolistId, title: action.payload.title, filter: ALL, addedDate: "", order: 0},
                ...state
            ];
        case SET_TODOLISTS:
            return action.payload.todolists.map(t => ({...t, filter: ALL}))
        default:
            return state;
    }
}


export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        payload: {
            todolistId,
            title
        }
    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: REMOVE_TODOLISTID,
        payload: {
            todolistId
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            newTodolistId: v1(),
            title
        }
    } as const
}

export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: CHANGE_FILTER,
        payload: {
            todolistId,
            filter
        }
    } as const
}

export const setTodolists = (todolists: TodolistType[] ) => {
    return {
        type: SET_TODOLISTS,
        payload: {
          todolists
        }
    } as const
}

export const fetchTodolistsThunk = () => {

    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolist().then(res => {
            dispatch(setTodolists(res.data))
        })
    }
}