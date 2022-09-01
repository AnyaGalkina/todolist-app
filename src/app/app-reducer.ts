export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialStateType = {
    status: RequestStatusType;
    error: string | null;
}

export type AppActionsType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>;;

const SET_STATUS = "APP/SET_STATUS";
const SET_ERROR = "APP/SET_ERROR";

const initialState: InitialStateType = {
    status: "idle",
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case SET_STATUS:
        case SET_ERROR:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({type: SET_STATUS, payload: {status}} as const);
export const setAppErrorAC = (error: string | null) => ({type: SET_ERROR, payload: {error}} as const);