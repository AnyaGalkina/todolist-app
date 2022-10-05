import {Dispatch} from "redux";
import {authAPI} from "../api/authAPI";
import {RESULT_CODES} from "../state/types/types";
import {setIsLoggedIn} from "../features/Login/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = typeof initialState;

const initialState = {
    //do we have interaction with server
    status: "idle" as RequestStatusType,
    // global error text
    error: null as string | null,
    //is our app has already initialized
    isInitialized: false
}


export const setInitialized = createAsyncThunk("app/setInitialized", async (params, thunkAPI) => {

    const res = await authAPI.me()
    try {
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            thunkAPI.dispatch(setIsLoggedIn({isLoggedIn: true}));
        }
    } finally {
        return {isInitialized: true}
        // thunkAPI.dispatch(setIsInitialized({isInitialized: true}));
    }
    // .then((res) => {
    //     if (res.data.resultCode === RESULT_CODES.succeeded) {
    //         thunkAPI.dispatch(setIsLoggedIn({isLoggedIn: true}));
    //     }
    // })
    // .finally(() => {
    //     thunkAPI.dispatch(setIsInitialized({isInitialized: true}));
    // })
})

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        // setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
        //     state.isInitialized = action.payload.isInitialized
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(setInitialized.fulfilled, (state, action) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer;
export const {setAppStatus, setAppError} = slice.actions;
