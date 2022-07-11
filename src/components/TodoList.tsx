import React, {ChangeEvent} from "react";
import {ACTIVE, ALL, COMPLETED, FilterValuesType, TaskType} from "../App";
import styles from "./TodoList.module.css";
// import Button from "./Button/Button";
import AddItemForm from "./Input/AddItemForm";
import EditableSpanTitle from "./EditableSpanTitle";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {DeleteOutline, DeleteOutlined} from "@mui/icons-material";

type PropsType = {
    todolistId: string;
    tasks: Array<TaskType>;
    title: string;
    removeTask: (todolistId: string, taskId: string) => void;
    changeFilter: (todolistId: string, filter: FilterValuesType) => void;
    addTask: (todolistId: string, value: string) => void;
    setPrevState: () => void;
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    changeTitle: (todolistId: string, taskId: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, title: string) => void;
}


const TodoList = (props: PropsType) => {

    const onFilterClickHandler = (filter: FilterValuesType) => {
        return () => props.changeFilter(props.todolistId, filter);
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId);
    }
    const addTask = (title: string) => {
        props.addTask(props.todolistId, title);
    }
    const onChangeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }
    let tasksList = props.tasks.length ?
        props.tasks.map((t) => {
            const onRemoveHandler   = () => props.removeTask(props.todolistId, t.id,);

            const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked,)
            }
            const onChangeTitleHandler = (newTitle: string) => {
                debugger
                props.changeTitle(props.todolistId, t.id, newTitle)
            }

            return (

                <div key={t.id} className={`${t.isDone && styles.isDone}`}>
                    <Checkbox
                        style={{color: "#c7f774"}}
                        checked={t.isDone}
                        onChange={onStatusChangeHandler}
                    />
                    <EditableSpanTitle title={t.taskTitle} onChangeTitle={onChangeTitleHandler}/>
                    <IconButton aria-label="delete"  onClick={onRemoveHandler}>
                        <DeleteOutline style={{color: "#6b7d84"}} fontSize={"small"}/>
                    </IconButton>
                </div>
            )
        }) :
        <span>Your task list is empty</span>


//JSX
    return (
        <div>
            <h3>
                <EditableSpanTitle title={props.title} onChangeTitle={onChangeTodolistTitleHandler}/>
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
                    variant={`${props.filter === ALL ? "contained" : "text"}`}
                    onClick={onFilterClickHandler(ALL)}
                >All</Button>
                <Button
                    variant={`${props.filter === ACTIVE ? "contained" : "text"}`}
                    onClick={onFilterClickHandler(ACTIVE)}
                    color={"secondary"}
                >Active</Button>
                <Button
                    variant={`${props.filter === COMPLETED ? "contained" : "text"}`}
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
}

export default TodoList;
