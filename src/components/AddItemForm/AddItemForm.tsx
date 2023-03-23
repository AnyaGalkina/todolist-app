import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import styles from './AddItemForm.module.css';

type PropsType = {
    addItem: (title: string) => void;
    disabled: boolean
}

export const AddItemForm = React.memo(({addItem, disabled}: PropsType) => {
    const [newItemTitle, setNewItemTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value);
        error && setError(null);
    };

    let addItemHandler = () => {
        let trimedItem = newItemTitle.trim();
        if (trimedItem) {
            addItem(newItemTitle);
        } else {
            setError("Title is required");
        }
        setNewItemTitle("");
    }
    let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addItemHandler();
    }

    return (
        <div className={styles.addItemContainer}>
            <TextField variant="outlined"

                       value={newItemTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyDownHandler}
                       error={!!error}
                       label={error ? "Title is required" : "Title"}
                       style={{color: "white"}}
                       disabled={disabled}
            />

            <Button
                variant={"contained"}
                style={{maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px", margin: "5px"}}
                onClick={addItemHandler}
                disabled={error !== null || disabled && true}
            >+</Button>
        </div>
    );
});
