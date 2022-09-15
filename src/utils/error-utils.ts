import {Dispatch} from "redux";
import {setAppStatus, setAppError} from "../app/app-reducer";
import {CommonResType} from "../api/todolistsAPI";

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppError({error: error.message}));
    dispatch(setAppStatus({status: "failed"}));
}
export const handleServerAppError = <T>(data: CommonResType<T>, dispatch: Dispatch) => {
    dispatch(setAppError(data.messages.length ? {error: data.messages[0]} : {error: "Some error occurred"}))
    dispatch(setAppStatus({status: "failed"}))
}