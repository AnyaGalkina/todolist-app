import {Dispatch} from "redux";
import {authAPI} from "../api/authAPI";
import {RESULT_CODES} from "../state/types/types";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {ActionType} from "../state/types/types";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialStateType = {
    status: RequestStatusType;
    error: string | null;
    isInitialized: boolean
}

export type AppActionsType =
    ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setIsInitializedAC>;
;

const SET_STATUS = "APP/SET_STATUS";
const SET_ERROR = "APP/SET_ERROR";
const SET_INITIALIZED = "APP/SET_INITIALIZED";

const initialState: InitialStateType = {
    //do we have interaction with server
    status: "idle",
    // global error text
    error: null,
    //is our app has already initialized
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
        case SET_INITIALIZED:
        case SET_ERROR:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: SET_STATUS, payload: {status}} as const);
export const setAppErrorAC = (error: string | null) =>
    ({type: SET_ERROR, payload: {error}} as const);
export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: SET_INITIALIZED, payload: {isInitialized}} as const);


export const setInitializedTC = () => (dispatch: Dispatch<ActionType>) => {
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(setIsLoggedInAC(true));
            }
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true));
        })
}