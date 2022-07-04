import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type PropsType = {
    title: string;
    onChangeTitle: (title: string) => void;
}

const EditableSpanTitle: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.title);

    const activateEditMode = () =>{
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
        editMode ? <input value={title}
                               onChange={onChangeTitleHandler}
                               onBlur={activateViewMode}
                               onKeyDown={onKeyDownHandler}
                               autoFocus/>
                : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
};

export default EditableSpanTitle;