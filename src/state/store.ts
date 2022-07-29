import {createStore, combineReducers, legacy_createStore} from "redux";
import {TodolistsReducer} from "./todolists-reducer";
import {TasksReducer} from "./tasks-reducer";


export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks:  TasksReducer
});

export const store = legacy_createStore(rootReducer);


//@ts-ignore
window.store = store;