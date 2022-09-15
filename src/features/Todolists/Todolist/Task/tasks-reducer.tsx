import {addTodolist, removeTodolist, setTodolists} from "../../todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../../../../api/todolistsAPI";
import {Dispatch} from "redux";
import {RESULT_CODES} from "../../../../state/types/types";
import {AppRootState} from "../../../../state/store";
import {RequestStatusType, setAppStatus} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

export type TasksType = {
    [key: string]: Array<TaskDomainType>
}

const initialState: TasksType = {}
const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            debugger
            let index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1);
            }
        },
        updateTask(state, action: PayloadAction<{ todolistId: string, taskId: string, task: TaskType }>) {
            let index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                state[action.payload.todolistId][index] = {...action.payload.task, entityStatus: "idle"};
            }
        },
        addTask(state, action: PayloadAction<{ todolistId: string, task: TaskType }>) {
            state[action.payload.todolistId].unshift({...action.payload.task, entityStatus: "idle"});
        },
        setTasks(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: "idle"}));
        },
        setTaskEntityStatus(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            let index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (bilder) => {
        bilder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        bilder.addCase(removeTodolist, (state, action) => {
            delete state[action.payload.todolistId]
        });
        bilder.addCase(setTodolists, (state, action) => {
            action.payload.todolists.forEach(t => {state[t.id] = [];})
        })
    }
});

export const tasksReducer = slice.reducer;
export const {removeTask, updateTask, addTask, setTaskEntityStatus, setTasks} = slice.actions;


//Thunks
export const getTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasks({todolistId, tasks: res.data.items}))
            dispatch(setAppStatus({status: "succeeded"}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTaskThunk = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(setTaskEntityStatus({todolistId, taskId, entityStatus: "loading"}));
    todolistsAPI.deleteTask({todolistId, taskId})
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(removeTask({todolistId, taskId}));
                dispatch(setAppStatus({status: "succeeded"}));
                dispatch(setTaskEntityStatus({todolistId, taskId, entityStatus: "succeeded"}));
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setTaskEntityStatus({todolistId, taskId, entityStatus: "failed"}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(setTaskEntityStatus({todolistId, taskId, entityStatus: "failed"}))
        })
}

export const addTaskThunk = (payload: { todolistId: string, title: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    todolistsAPI.createTask(payload)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(addTask({todolistId: payload.todolistId, task: res.data.data.item}));
                dispatch(setAppStatus({status: "succeeded"}));
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}

export type UpdateModuleType = {
    title?: string;
    description?: string;
    completed?: boolean;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
}

export const updateTaskThunk = (todolistId: string, taskId: string, model: UpdateModuleType) => (dispatch: Dispatch, getState: () => AppRootState) => {
    debugger
    dispatch(setAppStatus({status: "loading"}));
    dispatch(setTaskEntityStatus({todolistId, taskId, entityStatus: "loading"}));
    const task = getState().tasks[todolistId].find(t => t.id === taskId);

    if (task) {
        todolistsAPI.updateTask({
            todolistId, taskId, model: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.addedDate,
                deadline: task.deadline,
                ...model
            }
        })
            .then((res) => {
                if (res.data.resultCode === RESULT_CODES.succeeded) {
                    dispatch(updateTask({todolistId, taskId, task: res.data.data.item}));
                    dispatch(setAppStatus({status: "succeeded"}));
                    dispatch(setTaskEntityStatus({todolistId, taskId, entityStatus: "succeeded"}));
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch);
                    dispatch(setTaskEntityStatus({todolistId, taskId, entityStatus: "failed"}));

                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
                dispatch(setTaskEntityStatus({todolistId, taskId, entityStatus: "failed"}));
            })
    }
}