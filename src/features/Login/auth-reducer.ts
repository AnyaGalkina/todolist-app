import {Dispatch} from "redux";
import {ActionType, RESULT_CODES} from "../../state/types/types";
import {authAPI, LoginParamsType} from "../../api/authAPI";
import {setAppStatus} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type InitialStateType = typeof initialState;

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedIn} = slice.actions;


export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    try {
        const res = await authAPI.login(data);
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setIsLoggedIn({isLoggedIn: true}));
            dispatch(setAppStatus({status: "succeeded"}));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch);
        }
    }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setIsLoggedIn({isLoggedIn: false}));
            dispatch(setAppStatus({status: "succeeded"}));
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error, dispatch);
        }
    }

}
