import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {todolistsReducer} from "../features/Todolists/todolists-reducer";
import {tasksReducer} from "../features/Todolists/Todolist/Task/tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
// import {ActionType} from "./types/types";
import {appReducer} from "../app/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

export type AppRootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, any>;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
    devTools: true
    }
)



// export type AppThunkType<ReturnType = void> =
// ThunkAction<ReturnType, AppRootState, unknown, ActionType>;

//@ts-ignore
window.store = store;

