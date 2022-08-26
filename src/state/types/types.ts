import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolists
} from "../todolists-reducer";
import {
    addTaskAC,
    removeTaskAC,
    setTasksAC,
    updateTaskAC
} from "../tasks-reducer";

export type ActionType = ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof setTodolists>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTasksAC>;
