import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import styles from "../TodoList.module.css";
import {Checkbox, IconButton} from "@mui/material";
import EditableSpanTitle from "../EditableSpanTitle";
import {DeleteOutline} from "@mui/icons-material";
import {useDispatch} from "react-redux";


type TaskPropsType = {
    task: TaskType;
    todolistId: string
}
export const Task = React.memo(({task, todolistId}: TaskPropsType) => {
    console.log("Task")
    const dispatch = useDispatch();
    const onRemoveHandler = () => {
        dispatch(removeTaskAC(todolistId, task.id));
    };

    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, task.id, e.currentTarget.checked))
    }
    const onChangeTitleHandler = useCallback( (newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, newTitle))
    }, [todolistId, task.id, dispatch])

    return(
        <div  className={`${task.isDone && styles.isDone}`}>
            <Checkbox
                style={{color: "#c7f774"}}
                checked={task.isDone}
                onChange={onStatusChangeHandler}
            />
            <EditableSpanTitle title={task.taskTitle} onChangeTitle={onChangeTitleHandler}/>
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <DeleteOutline style={{color: "#6b7d84"}} fontSize={"small"}/>
            </IconButton>
        </div>
    )
})

