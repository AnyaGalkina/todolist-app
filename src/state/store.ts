import {combineReducers, legacy_createStore, compose} from "redux";
import {TodolistsReducer} from "./todolists-reducer";
import {TasksReducer} from "./tasks-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPODE__?: typeof compose;
    }
}

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks:  TasksReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPODE__ || compose;
export const store = legacy_createStore(rootReducer, composeEnhancers());


//@ts-ignore
window.store = store;