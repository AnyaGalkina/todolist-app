import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type PropsType = {
    addItem: (title: string) => void;
}


const AddItemForm = React.memo((props: PropsType) => {
    const [newItemTitle, setNewItemTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItemTitle(e.currentTarget.value);
        error && setError(null);
    };

    let addItem = () => {
        let trimedItem = newItemTitle.trim();
        if (trimedItem) {
            props.addItem(newItemTitle);
        } else {
            setError("Title is required");
        }
        setNewItemTitle("");
    }
    let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addItem();
    }

    // let isDisabled = error !== null && true;

    return (
        <div>
            <TextField variant="outlined"

                       value={newItemTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyDownHandler}
                       error={!!error}
                       label={error ? "Title is required" : "Title"}
                       style={{color: "white"}}
            />
            {/*<input*/}
            {/*    className={`${error && styles.error}`}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    value={newTaskTitle}*/}
            {/*    onKeyDown={onKeyDownHandler}/>*/}

            <Button
                variant={"contained"}
                style={{maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px"}}
                onClick={addItem}
                disabled={error !== null && true}
            >+</Button>

            {
                // error && <div className={styles.errorMessage}>{error}</div>
            }
        </div>
    )
        ;
});

export default AddItemForm;