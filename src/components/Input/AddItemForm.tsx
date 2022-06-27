import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "../Button/Button";
import styles from "../TodoList.module.css";

type PropsType = {
    addItem: (title: string) => void;
}


const AddItemForm: React.FC<PropsType> = (props) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
        error && setError(null);
    };

    let addTask = () => {
        let trimedTask = newTaskTitle.trim();
        if (trimedTask) {
            props.addItem(newTaskTitle);
        } else {
            setError("Title is required");
        }
        setNewTaskTitle('');
    }
    let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // setError(null);
        e.key === "Enter" && addTask();
    }

    let isDisabled = error !== null && true;
    return (
        <div>
            <input
                className={`${error && styles.error}`}
                onChange={onChangeHandler}
                value={newTaskTitle}
                onKeyDown={onKeyDownHandler}/>
            <Button title={"+"} onClikCallback={addTask} disabled={isDisabled}/>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default AddItemForm;