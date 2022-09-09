import {Dispatch} from "redux";
import {ActionType, RESULT_CODES} from "../../state/types/types";
import {authAPI, LoginParamsType} from "../../api/authAPI";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";

export const SET_AUTH = "AUTH/SET_AUTH";

const initialState = {
    isLoggedIn: false
}

export type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_AUTH:
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state;
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({type: SET_AUTH, payload: {isLoggedIn}} as const);

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"));
    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC("succeeded"));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch);
        }
    }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"));
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setIsLoggedInAC(false));
            dispatch(setAppStatusAC("succeeded"));
        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch);
        }
    }

}
