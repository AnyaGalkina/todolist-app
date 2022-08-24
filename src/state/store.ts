import {combineReducers, legacy_createStore, compose, applyMiddleware} from "redux";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolists,
    todolistsReducer
} from "./todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "./tasks-reducer";
import thunk from "redux-thunk";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPODE__?: typeof compose;
    }
}

export type ActionType = ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>;


export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPODE__ || compose;
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// export const store = legacy_createStore(rootReducer,  composeEnhancers());


//@ts-ignore
window.store = store;