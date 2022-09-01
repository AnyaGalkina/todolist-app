import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ActionType} from "./types/types";
import {appReducer} from "../app/app-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPODE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPODE__ || compose;

export type AppRootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootState, unknown, ActionType>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
});


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


// export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, ActionType>;

//@ts-ignore
window.store = store;


// import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
// import {profileReducer} from './profile-reducer';
// import {dialogsReducer} from './dialogs-reducer';
// import thunk from 'redux-thunk';
//
//
// export type ReduxStateType = ReturnType<typeof rootReducer>
//
// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }
//
// const rootReducer = combineReducers({
//     profilePage: profileReducer,
//     dialogsPage: dialogsReducer,
// })
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
//
// export default store
