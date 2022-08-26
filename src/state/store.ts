import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPODE__?: typeof compose;
    }
}

export type AppRootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPODE__ || compose;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


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
