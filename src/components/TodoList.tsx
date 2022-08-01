import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType} from "../App";
import styles from "./TodoList.module.css";
import AddItemForm from "./Input/AddItemForm";
import EditableSpanTitle from "./EditableSpanTitle";
import {Button, Checkbox, IconButton} from "@mui/material";
import {DeleteOutline, DeleteOutlined} from "@mui/icons-material";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskType
} from "../state/tasks-reducer";
import {
    ACTIVE,
    ALL,
    changeTodolistTitleAC,
    COMPLETED,
    removeTodolistAC, changeFilterAC,
    TodolistType
} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {Task} from "./Task/Task";

type PropsType = {
    todolist: TodolistType;
}


const TodoList = React.memo(({todolist}: PropsType) => {
    console.log("Todo list")
    const {title, id: todolistId, filter} = todolist;
    const dispatch = useDispatch();
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todolistId]);

    const onFilterClickHandler = useCallback((filter: FilterValuesType) => {
        return () => dispatch(changeFilterAC(todolistId, filter));
    },[dispatch, filter])

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(todolistId));
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(todolistId, title));
    }, [dispatch]);

    const onChangeTodolistTitleHandler = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, [title, dispatch])

    let tasksForToDoList = tasks;
    switch (filter) {
        case ACTIVE:
            tasksForToDoList = tasks.filter(t => !t.isDone)
            break
        case COMPLETED:
            tasksForToDoList = tasks.filter(t => t.isDone)
            break
    }


    let tasksList = tasks.length ?
        tasksForToDoList.map((t) => {
            // const onRemoveHandler = () => {
            //     dispatch(removeTaskAC(todolistId, t.id));
            // };
            //
            // const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            //     dispatch(changeTaskStatusAC(todolistId, t.id, e.currentTarget.checked))
            // }
            // const onChangeTitleHandler = (newTitle: string) => {
            //     dispatch(changeTaskTitleAC(todolistId, t.id, newTitle))
            // }


            return (
                <Task key={t.id} task={t} todolistId={todolistId}/>
                // <div key={t.id} className={`${t.isDone && styles.isDone}`}>
                //     <Checkbox
                //         style={{color: "#c7f774"}}
                //         checked={t.isDone}
                //         onChange={onStatusChangeHandler}
                //     />
                //     <EditableSpanTitle title={t.taskTitle} onChangeTitle={onChangeTitleHandler}/>
                //     <IconButton aria-label="delete" onClick={onRemoveHandler}>
                //         <DeleteOutline style={{color: "#6b7d84"}} fontSize={"small"}/>
                //     </IconButton>
                // </div>
            )
        }) :
        <span>Your task list is empty</span>


//JSX
    return (
        <div>
            <h3>
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

