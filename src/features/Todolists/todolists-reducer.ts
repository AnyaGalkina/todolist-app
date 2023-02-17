import {todolistsAPI, TodolistType} from "../../api/todolistsAPI";
import {RESULT_CODES} from "../../state/types/types";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const ALL = "all";
export const ACTIVE = "active";
export const COMPLETED = "completed";


const initialState = [] as Array<TodolistDomainType>;

export const getTodolists = createAsyncThunk("todolists/getTodolists", async (params, {rejectWithValue, dispatch}) => {
    dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await todolistsAPI.getTodolist();
        dispatch(setAppStatus({status: "succeeded"}));
        return {todolists: res.data}
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
})

export const removeTodolist = createAsyncThunk("todolists/removeTodolists", async (param: { todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: "loading"}))
    dispatch(setEntityStatus({todolistId: param.todolistId, entityStatus: "loading"}))

    try {
        const res = await todolistsAPI.deleteTodolist(param.todolistId);
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setAppStatus({status: "succeeded"}));
            return {todolistId: param.todolistId};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
        // dispatch(setEntityStatus({todolistId: param.todolistId, entityStatus: "failed"}));
        // return rejectWithValue(null);

    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        dispatch(setEntityStatus({todolistId: param.todolistId, entityStatus: "failed"}));
        return rejectWithValue(null);
    }
});


export const addTodolist = createAsyncThunk("todolists/addTodolist", async (param: { title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await todolistsAPI.createTodolist(param.title);
        //@ts-ignore
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setAppStatus({status: "succeeded"}));
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
})

export const updateTodolistTitle = createAsyncThunk("todolists/updateTodolistTitle", async (param: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus({status: "loading"}));
    try {
        const res = await todolistsAPI.updateTodolistTitle({todolistId: param.todolistId, title: param.title});
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setAppStatus({status: "succeeded"}));
            return {todolistId: param.todolistId, title: param.title}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
})

const slice = createSlice({
    name: "todolists",
    initialState,
    reducers: {
        changeFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            let index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].filter = action.payload.filter;
        },

        setEntityStatus(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            let index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].entityStatus = action.payload.entityStatus;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: ALL, entityStatus: "idle"}));
        });
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            let index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state.splice(index, 1);
        });
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: ALL, entityStatus: "idle"})
        });
        builder.addCase(updateTodolistTitle.fulfilled, (state, action) => {
            let index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].title = action.payload.title;
        });
    }
})
export const todolistsReducer = slice.reducer;
export const {
    changeFilter,
    setEntityStatus
} = slice.actions;
