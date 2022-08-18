import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Button, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";


export default {
    title: "TODOLIST/AddItemForm Component",
    component: AddItemForm,
    // argTypes: {
    //     addItem: {
    //         description: "Button 'add' was pressed"
    //     }
        args: {
            addItem: action( "Button 'add' was pressed")
            }
    // }
} as ComponentMeta<typeof AddItemForm>;

// const callback = action("Button 'add' was pressed");

// export const  AddItemFormBaseExample = () => {
//     return <AddItemForm addItem={callback}
//     />
// }

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormBaseExample = Template.bind({});
AddItemFormBaseExample.args = {
    addItem: action("Button 'add' was pressed")
};


const Template2: ComponentStory<typeof AddItemForm> = (args) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>("Title is required");

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
        error && setError(null);
    };

    let addItem = () => {
        let trimedTask = newTaskTitle.trim();
        if (trimedTask) {
            args.addItem(newTaskTitle);
        } else {
            setError("Title is required");
        }
        setNewTaskTitle("");
    }
    let onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addItem();
    }


    return (
        <div>
            <TextField variant="outlined"
                       value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyDownHandler}
                       // error={!!error}
                       error={true}
                       label={"Title is required" }
                       // label={error ? "Title is required" : "Title"}
                       style={{color: "white"}}
            />
            <Button
                variant={"contained"}
                style={{maxWidth: "30px", maxHeight: "30px", minWidth: "30px", minHeight: "30px"}}
                onClick={addItem}
                disabled={true}
                // disabled={error !== null && true}
            >+</Button>

            {
                // error && <div className={styles.errorMessage}>{error}</div>
            }
        </div>
    )
 }


export const AddItemFormStoryError = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// AddItemFormStoryError.args = {
//     addItem: action("Button 'add' was pressed")
// };
