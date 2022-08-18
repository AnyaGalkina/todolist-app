import React, {useCallback} from "react";
import AddItemForm from "../Input/AddItemForm";
import EditableSpanTitle from "../EditableSpan/EditableSpanTitle";
import {Button, IconButton} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";
import {addTaskAC} from "../../state/tasks-reducer";
import {
    ACTIVE,
    ALL,
    changeFilterAC,
    changeTodolistTitleAC,
    COMPLETED,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
} from "../../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {Task} from "../Task/Task";
import styles from "./TodoList.module.css";
import {TaskStatuses, TaskType} from "../../api/todolistsAPI";


type PropsType = {
    todolist: TodolistDomainType;
}


const TodoList = React.memo(({todolist}: PropsType) => {
    console.log("Todo list")
    const {title, id: todolistId, filter} = todolist;
    const dispatch = useDispatch();
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todolistId]);

    const onFilterClickHandler = useCallback((filter: FilterValuesType) => {
        return () => dispatch(changeFilterAC(todolistId, filter));
    }, [dispatch, filter])

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todolistId));
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolistId, title));
    }, [dispatch]);

    // const onChangeTodolistTitleHandler = useCallback((title: string) => {
    //     dispatch(changeTodolistTitleAC(todolistId, title));
    // }, [title, dispatch])

    const onChangeTodolistTitleHandler = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, [dispatch])

    let tasksForToDoList = tasks;
    switch (filter) {
        case ACTIVE:
            tasksForToDoList = tasks.filter(t => t.status === TaskStatuses.New)
            break
        case COMPLETED:
            tasksForToDoList = tasks.filter(t => t.status === TaskStatuses.Completed)
            break
    }


    let tasksList = tasks.length ?
        tasksForToDoList.map((t) => {
            return (
                    <Task key={t.id} task={t} todolistId={todolistId}/>
            )
        }) :
        <span>Your task list is empty</span>


//JSX
    return (
        <div>
            <h3 className={styles.todolistTitle}>
                <EditableSpanTitle title={title} onChangeTitle={onChangeTodolistTitleHandler}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <DeleteOutlined style={{color: "#6b7d84"}}/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <div>
                {tasksList}
            </div>
            <div>
                <Button
                    variant={`${filter === ALL ? "contained" : "text"}`}
                    onClick={onFilterClickHandler(ALL)}
                >All</Button>
                <Button
                    variant={`${filter === ACTIVE ? "contained" : "text"}`}
                    onClick={onFilterClickHandler(ACTIVE)}
                    color={"secondary"}
                >Active</Button>
                <Button
                    variant={`${filter === COMPLETED ? "contained" : "text"}`}
                    onClick={onFilterClickHandler(COMPLETED)}
                    size={"small"}
                    color={"success"}
                >Completed</Button>
            </div>
            <div>
                {/*<Button title={"undo"} onClikCallback={props.setPrevState}/>*/}
            </div>
        </div>
    )
});

export default TodoList;

