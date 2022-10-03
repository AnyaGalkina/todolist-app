import {Dispatch} from "redux";
import {authAPI} from "../api/authAPI";
import {RESULT_CODES} from "../state/types/types";
import {setIsLoggedIn} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
        setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer;
export const {setAppStatus, setAppError, setIsInitialized} = slice.actions;

export const setInitializedTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(setIsLoggedIn({isLoggedIn: true}));
            }
        })
        .finally(() => {
            dispatch(setIsInitialized({isInitialized: true}));
        })
}