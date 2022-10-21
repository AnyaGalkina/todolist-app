import React, {memo, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton} from "@mui/material";
import EditableSpanTitle from "../EditableSpan/EditableSpanTitle";
import {UpdateModuleType} from "../../features/Todolists/Todolist/Task/tasks-reducer";
import {useAppSelector} from "../../state/store";
import AssignmentIcon from "@mui/icons-material/Assignment";
import styles from "./Modal.module.css";


type PropsType = {
    open: boolean;
    description: string;
    title: string;
    handleSave: (model: UpdateModuleType) => void;
    handleClose: () => void;
    handleOpen: () => void;
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    minHeight: "100vh",
    border: "2px solid #000",
    boxShadow: 24,
}

export const ModalDescription = memo(({open, description, handleClose, title, handleSave, handleOpen}: PropsType) => {
    const appStatus = useAppSelector(state => state.app.status);

    const [newDescription, setNewDescription] = useState(description);

    const onChangeDescriptionHandler = (newTitle: string) => {
        setNewDescription(newTitle)
    }

    const onSaveClickHandler = () => {
        handleSave({description: newDescription});
    }

    const isDisabled = appStatus === "loading";

    return (
        <div>
            <IconButton onClick={handleOpen} disabled={isDisabled}>
                <AssignmentIcon style={{color: "#6b7d84"}} fontSize={"small"}/>
            </IconButton>
            <Dialog sx={style} open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <Divider/>

                <div className={styles.bodyDescriptionBlock}>
                    <DialogContent style={{maxWidth: "500px"}}>
                        {/*<TaskImage newDescription={newDescription} setNewDescription={setNewDescription} isDisabled={isDisabled}/>*/}
                        <EditableSpanTitle
                            widthInput={"350px"}
                            title={newDescription ? newDescription : "Click on text to add new description"}
                            onChangeTitle={onChangeDescriptionHandler}
                            disabled={isDisabled}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{margin: 15}}
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={onSaveClickHandler}
                            disabled={isDisabled}
                            autoFocus>Save
                        </Button>
                        <Button
                            style={{margin: 15}}
                            size="small"
                            color="success"
                            variant="outlined"
                            onClick={handleClose}
                            disabled={isDisabled}>Close
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
});