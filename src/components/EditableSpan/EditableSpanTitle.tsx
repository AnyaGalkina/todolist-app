import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TextField} from '@mui/material';
import styles from './EditableSpanTitle.module.css';

type PropsType = {
    title: string;
    onChangeTitle: (title: string) => void;
    disabled: boolean;
    widthInput?: string;
}


export const EditableSpanTitle: React.FC<PropsType> = React.memo((props) => {
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
        setEditMode(false);
        props.onChangeTitle(title)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && activateViewMode();
    }

    return (
        editMode ? <TextField
                style={props.widthInput ? {width: props.widthInput} : {}}
                color={'secondary'}
                variant="standard"
                value={title}
                onChange={onChangeTitleHandler}
                onBlur={activateViewMode}
                onKeyDown={onKeyDownHandler}
                autoFocus
                disabled={props.disabled}
            />
            : <span className={styles.span} onClick={activateEditMode}>{props.title}</span>
    );
});
