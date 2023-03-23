import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {TextField} from '@mui/material';
import styles from './EditableSpanTitle.module.css';

type PropsType = {
    title: string;
    onChangeTitle: (title: string) => void;
    disabled: boolean;
    widthInput?: string;
}


export const EditableSpanTitle: React.FC<PropsType> = React.memo(({title, onChangeTitle, disabled, widthInput} : PropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setTitle] = useState(title);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(title);
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const activateViewMode = () => {
        setEditMode(false);
        onChangeTitle(newTitle)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.key === 'Enter' && activateViewMode();
    }

    return (
        editMode ? <TextField
                style={widthInput ? {width: widthInput} : {}}
                color={'secondary'}
                variant="standard"
                value={newTitle}
                onChange={onChangeTitleHandler}
                onBlur={activateViewMode}
                onKeyDown={onKeyDownHandler}
                autoFocus
                disabled={disabled}
            />
            : <div className={styles.span} onClick={activateEditMode}>{title}</div>
    );
});
