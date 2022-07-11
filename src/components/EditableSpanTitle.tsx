import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@mui/material";

type PropsType = {
    title: string;
    onChangeTitle: (title: string) => void;
}

function TextArea(props: { onBlur: () => void, onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, autoFocus: boolean, value: string }) {
    return null;
}

const EditableSpanTitle: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.title);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const activateViewMode = () => {
        debugger
        setEditMode(false);
        props.onChangeTitle(title)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === "Enter" && activateViewMode();
    }

    return (
        editMode ? <TextField
                color={"secondary"}
                variant="standard"
                value={title}
                onChange={onChangeTitleHandler}
                onBlur={activateViewMode}
                onKeyDown={onKeyDownHandler}
                autoFocus
            />
            : <span onDoubleClick ={activateEditMode}>{props.title}</span>
    );
};

export default EditableSpanTitle;