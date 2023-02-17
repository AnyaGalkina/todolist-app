import {addTodolist, getTodolists, removeTodolist} from "../../todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../../../../api/todolistsAPI";
import {RESULT_CODES} from "../../../../state/types/types";
import {AppRootState} from "../../../../state/store";
import {RequestStatusType, setAppStatus} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
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

export type TasksType = {
    [key: string]: Array<TaskDomainType>
}

const initialState: TasksType = {}


export const getTasks = createAsyncThunk("tasks/getTasks", async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await todolistsAPI.getTasks(todolistId)

        thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
        return {todolistId, tasks: res.data.items}
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
    }
})

export const removeTask = createAsyncThunk("tasks/removeTask", async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}));
    thunkAPI.dispatch(setTaskEntityStatus({
        todolistId: param.todolistId,
        taskId: param.taskId,
        entityStatus: "loading"
    }));
    try {
        const res = await todolistsAPI.deleteTask({todolistId: param.todolistId, taskId: param.taskId})

        if (res.data.resultCode === RESULT_CODES.succeeded) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
            thunkAPI.dispatch(setTaskEntityStatus({
                todolistId: param.todolistId,
                taskId: param.taskId,
                entityStatus: "succeeded"
            }));
            return {todolistId: param.todolistId, taskId: param.taskId};
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            thunkAPI.dispatch(setTaskEntityStatus({
                todolistId: param.todolistId,
                taskId: param.taskId,
                entityStatus: "failed"
            }));
            return thunkAPI.rejectWithValue(null);
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch);
        thunkAPI.dispatch(setTaskEntityStatus({
            todolistId: param.todolistId,
            taskId: param.taskId,
            entityStatus: "failed"
        }));
        return thunkAPI.rejectWithValue(null);
    }
})


export const addTask = createAsyncThunk("tasks/addTask", async (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await todolistsAPI.createTask(param);
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
            return {todolistId: param.todolistId, task: res.data.data.item}
        } else {
            handleServerAppError<{ item: TaskType }>(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null);
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
    }
})


export const updateTask = createAsyncThunk("tasks/updateTask", async (param: {
    todolistId: string,
    taskId: string,
    model: UpdateModuleType
}, {dispatch, rejectWithValue, getState}) => {

    dispatch(setAppStatus({status: "loading"}));
    dispatch(setTaskEntityStatus({todolistId: param.todolistId, taskId: param.taskId, entityStatus: "loading"}));
    const state = getState() as AppRootState;
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId);
    if (task) {
        const res = await todolistsAPI.updateTask({
            todolistId: param.todolistId, taskId: param.taskId, model: {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.addedDate,
                deadline: task.deadline,
                ...param.model
            }
        })
        try {
            if (res.data.resultCode === RESULT_CODES.succeeded) {
                dispatch(setAppStatus({status: "succeeded"}));
                dispatch(setTaskEntityStatus({
                    todolistId: param.todolistId,
                    taskId: param.taskId,
                    entityStatus: "succeeded"
                }));
                return {todolistId: param.todolistId, taskId: param.taskId, task: res.data.data.item};
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch);
                dispatch(setTaskEntityStatus({
                    todolistId: param.todolistId,
                    taskId: param.taskId,
                    entityStatus: "failed"
                }));
                return rejectWithValue(null);
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            dispatch(setTaskEntityStatus({todolistId: param.todolistId, taskId: param.taskId, entityStatus: "failed"}));
            return rejectWithValue(null);
        }
    }
    return rejectWithValue(null);

})

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTaskEntityStatus(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestStatusType }>) {
            let index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                state[action.payload.todolistId][index].entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(getTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(t => {
                state[t.id] = [];
            })
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks.map(t => ({...t, entityStatus: "idle"}));
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            let index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1);
            }
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todolistId].unshift({...action.payload.task, entityStatus: "idle"});
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            let index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                state[action.payload.todolistId][index] = {...action.payload.task, entityStatus: "idle"};
            }
        });
    }
});

export const tasksReducer = slice.reducer;
export const {setTaskEntityStatus} = slice.actions;
