import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {ActionType, RESULT_CODES} from "./types/types";
import {RequestStatusType, setAppStatusAC} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const CHANGE_TODOLIST_TITLE = "TODO_LISTS/CHANGE_TODOLIST_TITLE"
export const REMOVE_TODOLISTID = "TODO_LISTS/REMOVE_TODO_LISTS";
export const ADD_TODOLIST = "TODO_LISTS/ADD_TODOLIST";
export const CHANGE_FILTER = "TODO_LISTS/CHANGE_FILTER";
export const SET_TODOLISTS = "TODO_LISTS/SET_TODO_LISTS";
export const SET_ENTITY_STATUS = "TODO_LISTS/SET_ENTITY_STATUS"

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
            return action.payload.todolists.map((t: TodolistType) => ({...t, filter: ALL, entityStatus: "idle"}))
        case SET_ENTITY_STATUS:
            return state.map(t => t.id === action.payload.todolistId ? {...t, entityStatus: action.payload.entityStatus} : t )
        default:
            return state;
    }
}

//Action creators
export const removeTodolistAC = (todolistId: string) =>
    ({type: REMOVE_TODOLISTID, payload: {todolistId}} as const);
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: ADD_TODOLIST, payload: {todolist}} as const);
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: CHANGE_TODOLIST_TITLE, payload: {todolistId, title}} as const);
export const changeFilterAC = (todolistId: string, filter: FilterValuesType) =>
    ({type: CHANGE_FILTER, payload: {todolistId, filter}} as const);
export const setTodolists = (todolists: TodolistType[]) =>
    ({type: SET_TODOLISTS, payload: {todolists}} as const);
export const setEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) =>
    ({type: SET_ENTITY_STATUS , payload: {todolistId, entityStatus}} as const);

//Thunks
export const getTodolistsThunk = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolists(res.data))
            // dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}

export const removeTodolistsThunk = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setEntityStatusAC(todolistId, "loading"))

    todolistsAPI.deleteTodolist(todolistId)

        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(removeTodolistAC(todolistId));
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setEntityStatusAC(todolistId, "failed"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
            dispatch(setEntityStatusAC(todolistId, "failed"))
        })
}

export const addTodolistThunk = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodolistTitle({todolistId, title})
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch((changeTodolistTitleAC(todolistId, title)));
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}