import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {ActionType} from "./types/types";
import {appReducer} from "../app/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../features/Login/auth-reducer";

export type AppRootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, ActionType>;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, ActionType>;

//@ts-ignore
window.store = store;

