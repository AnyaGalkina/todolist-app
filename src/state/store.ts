import {combineReducers } from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {authReducer, todolistsReducer, tasksReducer} from '../features';
import {appReducer} from '../app/app-reducer';
import {configureStore} from '@reduxjs/toolkit';

export type AppRootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, any>;

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

//@ts-ignore
window.store = store;
