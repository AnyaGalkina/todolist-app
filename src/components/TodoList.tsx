import React, {ChangeEvent} from "react";
import {ACTIVE, ALL, COMPLETED, FilterValuesType, TaskType} from "../App";
import styles from "./TodoList.module.css";
import Button from "./Button/Button";
import AddItemForm from "./Input/AddItemForm";
import EditableSpanTitle from "./EditableSpanTitle";

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
            const onRemoveHandler = () => props.removeTask(props.todolistId, t.id,);

            const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked,)
            }
            const onChangeTitleHandler = (newTitle: string) => {
                debugger
                props.changeTitle(props.todolistId, t.id, newTitle)
            }

            return (

                <li key={t.id} className={`${t.isDone && styles.isDone}`}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onStatusChangeHandler}/>
                    <EditableSpanTitle title={t.taskTitle} onChangeTitle={onChangeTitleHandler}/>
                    <Button title={"x"} onClikCallback={onRemoveHandler}/>
                </li>
            )
        }) :
        <span>Your task list is empty</span>

    // let isDisabled = error !== null && true;

    //JSX
    return (
        <div>
            <h3>
                <EditableSpanTitle title={props.title} onChangeTitle={onChangeTodolistTitleHandler}/>
            </h3>
            <Button title={"x"} onClikCallback={removeTodolistHandler}/>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button title={"All"} className={`${props.filter === ALL && "active-filter"}`}
                        onClikCallback={onFilterClickHandler(ALL)}
                />
                <Button title={"Active"} className={`${props.filter === ACTIVE && "active-filter"}`}
                        onClikCallback={onFilterClickHandler(ACTIVE)}
                />
                <Button title={"Completed"} className={`${props.filter === COMPLETED && "active-filter"}`}
                        onClikCallback={onFilterClickHandler(COMPLETED)}
                />
            </div>
            <div>
                <Button title={"undo"} onClikCallback={props.setPrevState}/>
            </div>
        </div>
    )
}

export default TodoList;
