import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {ActionType} from "./types/types";
import {RequestStatusType, setStatusAC} from "../app/app-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
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
    // {id: todoListId1, title: "Learn in Front End", filter: ALL, addedDate: "", order: 0},
    // {id: todoListId2, title: "New skills", filter: ALL, addedDate: "", order: 0}
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    debugger
    switch (action.type) {
        case CHANGE_TODOLIST_TITLE:
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.title} : t);
        case CHANGE_FILTER:
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.filter} : t);
        case REMOVE_TODOLISTID:
            return state.filter(t => t.id !== action.payload.todolistId);
        case ADD_TODOLIST:
            return [{...action.payload.todolist, filter: ALL, entityStatus: "idle"}, ...state];
        case SET_TODOLISTS:
            return action.payload.todolists.map(t => ({...t, filter: ALL, entityStatus: "idle"}))
        default:
            return state;
    }
}

//Action creators
export const removeTodolistAC = (todolistId: string) =>
    ({type: REMOVE_TODOLISTID, payload: {todolistId}} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: ADD_TODOLIST, payload: {todolist}} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: CHANGE_TODOLIST_TITLE, payload: {todolistId, title}} as const)
export const changeFilterAC = (todolistId: string, filter: FilterValuesType) =>
    ({type: CHANGE_FILTER, payload: {todolistId, filter}} as const)
export const setTodolists = (todolists: TodolistType[]) =>
    ({type: SET_TODOLISTS, payload: {todolists}} as const)

//Thunks
export const getTodolistsThunk = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todolistsAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolists(res.data))
            dispatch(setStatusAC("succeeded"))
        })
}

export const removeTodolistsThunk = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const addTodolistThunk = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const updateTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodolistTitle({todolistId, title})
        .then((res) => {
            dispatch((changeTodolistTitleAC(todolistId, title)))
        })
}