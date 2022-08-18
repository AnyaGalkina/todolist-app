import {Provider} from "react-redux"
import {combineReducers, createStore} from "redux"
import {v1} from "uuid"
import {TasksReducer} from "./tasks-reducer";
import {TodolistsReducer} from "./todolists-reducer";
import {AppRootState, store} from "./store";
import React from "react";

const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), taskTitle: "HTML&CSS", isDone: true},
            {id: v1(), taskTitle: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), taskTitle: "Milk", isDone: true},
            {id: v1(), taskTitle: "React Book", isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>
)


// export const ReduxSAtoreProviderDecorator = (storyFn: React.ReactNode) => {
//     return <Provider store={store}>{storyFn()}</Provider>
// }

// export const ReduxSAtoreProviderDecorator = (storyFn: React.ElementType) => {
//     return <Provider store={store}><storyFn/></Provider>
// }
