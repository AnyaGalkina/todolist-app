import {removeTask, TaskDomainType, UpdateModuleType, updateTask} from './tasks-reducer';
import React, {ChangeEvent, useCallback, useState} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpanTitle, ModalDescription} from '../../../../components';
import {DeleteOutline} from '@mui/icons-material';
import styles from './Task.module.css';
import {TaskStatuses} from '../../../../api/todolistsAPI';
import {useAppDispatch} from '../../../../state';

type TaskPropsType = {
    task: TaskDomainType;
    todolistId: string
}
export const Task = React.memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onRemoveHandler = () => {
        dispatch(removeTask({todolistId, taskId: task.id}));
    };

    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status = task.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed
        dispatch(updateTask({todolistId, taskId: task.id, model: {status}}))
    }
    const onChangeTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTask({todolistId, taskId: task.id, model: {title: newTitle}}))
    }, [todolistId, task.id, dispatch]);

    const handleModalOpen = useCallback(() => {
        setIsModalOpen(true);
    }, [isModalOpen, dispatch]);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
    }, [isModalOpen, dispatch]);

    const handleModalSave = useCallback((model: UpdateModuleType) => {
        dispatch(updateTask({todolistId, taskId: task.id, model}));
        setIsModalOpen(false);
    }, [isModalOpen, task.id, todolistId, task.description, dispatch]);

    let isDisabled = task.entityStatus === 'loading';

    return (

        <div>
            <div className={styles.task}>
                <div>
                    <Checkbox
                        style={{color: '#c7f774'}}
                        checked={task.status === TaskStatuses.Completed}
                        onChange={onStatusChangeHandler}
                        disabled={isDisabled}
                    />
                    <EditableSpanTitle title={task.title} onChangeTitle={onChangeTitleHandler} disabled={isDisabled}/>
                </div>
                <div className={styles.icons}>
                    <ModalDescription open={isModalOpen}
                                      description={task.description}
                                      title={task.title}
                                      handleSave={handleModalSave}
                                      handleClose={handleModalClose}
                                      handleOpen={handleModalOpen}
                    />
                    <IconButton aria-label="delete task" onClick={onRemoveHandler} disabled={isDisabled}>
                        <DeleteOutline style={{color: '#6b7d84'}} fontSize={'small'}/>
                    </IconButton>
                </div>
            </div>
            <div className={styles.descriptionBlock}>
                {task.description}
            </div>
        </div>
    )
})

