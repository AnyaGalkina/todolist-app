import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setEntityStatusAC,
    setTodolists
} from "../todolists-reducer";
import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    updateTaskAC
} from "../tasks-reducer";
import {AppActionsType} from "../../app/app-reducer";

export type ActionType = ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setEntityStatusAC>
    | AppActionsType;


export enum RESULT_CODES {
    succeeded = 0,
    error = 1,
    // bad_captcha = 2
}
