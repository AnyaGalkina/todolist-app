import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TaskType, {FilterValuesType} from '../PrevApp';
import styles from "./TodoList.module.css";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean
}

type PropsType = {
    tasks: Array<TaskType>;
    title: string;
    removeTask: (id: string) => void;
    changeFilter: (filter: FilterValuesType) => void;
    addTask: (value: string) => void;
    setPrevState: () => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    filter: FilterValuesType;
}

const PrevTodoList = (props: PropsType) => {

        const [newTaskTitle, setNewTaskTitle] = useState('');
        const [error, setError] = useState<string | null>(null);

        let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setNewTaskTitle(e.currentTarget.value);
            error && setError(null);
        };

        let addTask = () => {
            let trimedTask = newTaskTitle.trim();
            if(trimedTask) {
                props.addTask(newTaskTitle);
            }else{
                setError("Title is required");
            }
            setNewTaskTitle('');
        }

        let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            // setError(null);
            e.key === "Enter" && addTask();
        }

        let onFilterClickHandler = (filter: FilterValuesType) => {
            return () => props.changeFilter(filter);
        }

        let tasksList = props.tasks.length ? props.tasks.map((t) => {
            let onRemoveHandler = () => props.removeTask(t.id);

            let onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked)
            }

            return (

                <li key={t.id} className={`${t.isDone && styles.isDone}`}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onStatusChangeHandler}/>
                    <span>{t.title}</span>
                    <button onClick={onRemoveHandler}>x</button>
                </li>
            )
        }) : <span>Your task list is empty</span>

        // let isDisabled = error !== null && true;

    //JSX
        return (
            <div>
                <div>
                    <h3>{props.title}</h3>
                    <div>
                        <input
                            className={`${error && styles.error}`}
                            onChange={onChangeHandler}
                            value={newTaskTitle}
                            onKeyDown={onKeyDownHandler}/>
                        <button
                            // disabled={isDisabled}
                            onClick={addTask}>+</button>
                        {error && <div className={styles.errorMessage}>{error}</div>}
                    </div>
                    <ul>
                        {tasksList}
                    </ul>
                    <div>
                        <button className={`${props.filter === "all" && 'active-filter'}`} onClick={onFilterClickHandler("all")}>All</button>
                        <button className={`${props.filter === "active" && 'active-filter'}`} onClick={onFilterClickHandler('active')}>Active</button>
                        <button className={`${props.filter === "completed" && 'active-filter'}`} onClick={onFilterClickHandler("completed")}>Completed</button>
                    </div>
                    <div>
                        <button onClick={props.setPrevState}>undo</button>
                    </div>
                </div>
            </div>
        )
    }
;

export default PrevTodoList;