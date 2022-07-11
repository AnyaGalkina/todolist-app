import React, {ChangeEvent, KeyboardEvent, useState} from "react";
// import Button from "../Button/Button";
import styles from "../TodoList.module.css";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type PropsType = {
    addItem: (title: string) => void;
}


const AddItemForm: React.FC<PropsType> = (props) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
        error && setError(null);
    };

    let addItem = () => {
        let trimedTask = newTaskTitle.trim();
        if (trimedTask) {
            props.addItem(newTaskTitle);
        } else {
            setError("Title is required");
        }
        setNewTaskTitle("");
    }
    let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // setError(null);
        e.key === "Enter" && addItem();
    }

    // let isDisabled = error !== null && true;

    return (
        <div>
            <TextField variant="outlined"

                       value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyDownHandler}
                       error={!!error}
                       // helperText={error}
                       label={ error ? "Title is required" : "Title"}
                       style={{color: "white"}}
            />
            {/*<input*/}
            {/*    className={`${error && styles.error}`}*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    value={newTaskTitle}*/}
            {/*    onKeyDown={onKeyDownHandler}/>*/}

            <Button
               variant={"contained"}
              style={{maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px",
                  // backgroundColor:"#66b1d1"
            }}
               onClick={addItem} disabled = { error !== null && true}
             >+</Button>

            {
                // error && <div className={styles.errorMessage}>{error}</div>
            }
        </div>
    )
        ;
};

export default AddItemForm;