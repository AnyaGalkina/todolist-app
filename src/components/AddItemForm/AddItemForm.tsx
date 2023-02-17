import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";

type PropsType = {
    addItem: (title: string) => void;
    disabled: boolean
}

export const AddItemForm = React.memo((props: PropsType) => {
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

    return (
        <div>
            <TextField variant="outlined"

                       value={newItemTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyDownHandler}
                       error={!!error}
                       label={error ? "Title is required" : "Title"}
                       style={{color: "white"}}
                       disabled={props.disabled}
            />

            <Button
                variant={"contained"}
                style={{maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px"}}
                onClick={addItem}
                disabled={error !== null || props.disabled && true}
            >+</Button>
        </div>
    )
        ;
});
