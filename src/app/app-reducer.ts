import {Dispatch} from "redux";
import {authAPI} from "../api/authAPI";
import {RESULT_CODES} from "../state/types/types";
import {setIsLoggedIn} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

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

//
// export type InitialStateType = {
//     status: RequestStatusType;
//     error: string | null;
//     isInitialized: boolean
// }
// export type AppActionsType =
//     ReturnType<typeof setAppErrorAC>
//     | ReturnType<typeof setAppStatusAC>
//     | ReturnType<typeof setIsInitializedAC>;
// ;
//
// const SET_STATUS = "APP/SET_STATUS";
// const SET_ERROR = "APP/SET_ERROR";
// const SET_INITIALIZED = "APP/SET_INITIALIZED";

// export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
//     switch (action.type) {
//         case SET_STATUS:
//         case SET_INITIALIZED:
//         case SET_ERROR:
//             return {...state, ...action.payload};
//         default:
//             return state;
//     }
// }

// export const setAppStatusAC = (status: RequestStatusType) =>
//     ({type: SET_STATUS, payload: {status}} as const);
// export const setAppErrorAC = (error: string | null) =>
//     ({type: SET_ERROR, payload: {error}} as const);
// export const setIsInitializedAC = (isInitialized: boolean) =>
//     ({type: SET_INITIALIZED, payload: {isInitialized}} as const);
//

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