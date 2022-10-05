import React, {useCallback, useEffect} from "react";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpanTitle from "../../../components/EditableSpan/EditableSpanTitle";
import {Button, IconButton} from "@mui/material";
import {DeleteOutlined} from "@mui/icons-material";
import {addTask, getTasks, TaskDomainType} from "./Task/tasks-reducer";
import {
    ACTIVE,
    ALL,
    changeFilter,
    COMPLETED,
    FilterValuesType,
    removeTodolist,
    TodolistDomainType,
    updateTodolistTitle,
} from "../todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootState} from "../../../state/store";
import {Task} from "./Task/Task";
import styles from "./TodoList.module.css";
import {TaskStatuses} from "../../../api/todolistsAPI";
import {useAppDispatch} from "../../../state/hooks";


type PropsType = {
    todolist: TodolistDomainType;
}

const TodoList = React.memo(({todolist}: PropsType) => {
    const {title, id: todolistId, filter, entityStatus} = todolist;
    // const dispatch = useDispatch();
    let tasks = useSelector<AppRootState, Array<TaskDomainType>>(state => state.tasks[todolistId]);
    const dispatch = useAppDispatch();


    const onFilterClickHandler = useCallback((filter: FilterValuesType) => {
        return () => dispatch(changeFilter({todolistId, filter}));
    }, [dispatch, filter])

    const removeTodolistHandler = () => {
        dispatch(removeTodolist({todolistId}))
    }
    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTask({todolistId, title}));
    }, [dispatch]);

    const onChangeTodolistTitleHandler = useCallback((title: string) => {
        dispatch(updateTodolistTitle({todolistId, title}))
    }, [title, dispatch])

    const isDisabled = entityStatus === "loading";

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


    useEffect(() => {
        dispatch(getTasks(todolistId));
    }, []);

//JSX
    return (
        <div>
            <h3 className={styles.todolistTitle}>
                <EditableSpanTitle title={title} onChangeTitle={onChangeTodolistTitleHandler} disabled={isDisabled}/>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} disabled={isDisabled}>
                    <DeleteOutlined style={{color: "#6b7d84"}}/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTaskHandler} disabled={isDisabled }/>
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

