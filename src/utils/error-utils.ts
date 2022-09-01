import {Dispatch} from "redux";
import {AppActionsType, setAppStatusAC, setAppErrorAC} from "../app/app-reducer";
import {CommonResType} from "../api/todolistsAPI";

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppErrorAC(error.message));
    dispatch(setAppStatusAC("failed"));
}
export const handleServerAppError = <T>(data: CommonResType<T>, dispatch: Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC("failed"))
}