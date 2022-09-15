import {todolistsAPI, TodolistType} from "../../api/todolistsAPI";
import {Dispatch} from "redux";
import {RESULT_CODES} from "../../state/types/types";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const ALL = "all";
export const ACTIVE = "active";
export const COMPLETED = "completed";


const initialState = [] as Array<TodolistDomainType>;

const slice = createSlice({
    name: "todolists",
    initialState,
    reducers: {
        removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
            let index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state.splice(index, 1);
            //return state.filter(t => t.id !== action.payload.todolistId);
        },
        addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: ALL, entityStatus: "idle"})
        },
        changeTodolistTitle(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            let index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].title = action.payload.title;
        },
        changeFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            let index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].filter = action.payload.filter;
        },
        setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: ALL, entityStatus: "idle"}))
        },
        setEntityStatus(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            let index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].entityStatus = action.payload.entityStatus;
        },
    }
})
export const todolistsReducer = slice.reducer;
export const {
    removeTodolist,
    setTodolists,
    addTodolist,
    changeFilter,
    changeTodolistTitle,
    setEntityStatus
} = slice.actions;


//Thunks
export const getTodolistsThunk = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    todolistsAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolists({todolists: res.data}))
            // dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTodolistsThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    dispatch(setEntityStatus({todolistId, entityStatus: "loading"}))

    todolistsAPI.deleteTodolist(todolistId)

        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(removeTodolist({todolistId}));
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setEntityStatus({todolistId, entityStatus: "failed"}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
            dispatch(setEntityStatus({todolistId, entityStatus: "failed"}))
        })
}

export const addTodolistThunk = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(addTodolist({todolist: res.data.data.item}));
                dispatch(setAppStatus({status: "succeeded"}));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolistTitle({todolistId, title})
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch((changeTodolistTitle({todolistId, title: title})));
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}