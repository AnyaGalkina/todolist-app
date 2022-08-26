import {removeTaskThunk, updateTaskThunk} from "../../../../state/tasks-reducer";
import React, {ChangeEvent, useCallback, useEffect} from "react";
import {Checkbox, IconButton} from "@mui/material";
import EditableSpanTitle from "../../../../components/EditableSpan/EditableSpanTitle";
import {DeleteOutline} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import styles from "./Task.module.css";
import {TaskStatuses, TaskType} from "../../../../api/todolistsAPI";
import {useAppDispatch} from "../../../../state/hooks";


type TaskPropsType = {
    task: TaskType;
    todolistId: string
}
export const Task = React.memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useAppDispatch();
    // const dispatch = useDispatch();

    const onRemoveHandler = () => {
        dispatch(removeTaskThunk(todolistId, task.id));
    };

    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status = task.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed
        dispatch(updateTaskThunk(todolistId, task.id, {status}))
    }
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskThunk(todolistId, task.id, {title: newTitle}))
    }, [todolistId, task.id, dispatch])

    return (
        // <div  className={`${task.isDone ? styles.taskIsDone : styles.task}`}>
        <div className={styles.task}>
            <div>
                <Checkbox
                    style={{color: "#c7f774"}}
                    checked={task.status === TaskStatuses.Completed}
                    onChange={onStatusChangeHandler}
                />
                <EditableSpanTitle title={task.title} onChangeTitle={onChangeTitleHandler}/>
            </div>
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <DeleteOutline style={{color: "#6b7d84"}} fontSize={"small"}/>
            </IconButton>
        </div>
    )
})

