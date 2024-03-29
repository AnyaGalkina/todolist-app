import {Provider} from "react-redux"
import {applyMiddleware, combineReducers, createStore} from "redux"
import {v1} from "uuid"
import {tasksReducer} from '../features';
import {ALL, todolistsReducer} from "../features/Todolists/todolists-reducer";
import React from "react";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";
import {appReducer} from '../app/app-reducer';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

const initialGlobalState = {
    todolists: [
        {id: "todoListId1", title: "Learn in Front End", filter: ALL, addedDate: "", order: 0, entityStatus: "idle"},
        {id: "todoListId2", title: "New skills", filter: ALL, addedDate: "", order: 0, entityStatus: "idle"}

    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "todoListId1"
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "todoListId1"
            },

        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Ride a car",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "todoListId2"
            },
            {
                id: v1(), title: "Ride a motorbike", status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                addedDate: "",
                deadline: "",
                description: "",
                order: 0,
                todoListId: "todoListId2"
            },
        ]
    },
    app: {
        error: null,
        status: "idle"
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as any, applyMiddleware(thunk))

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
