import {useDispatch, useSelector} from "react-redux";
import {AppRootState, AppDispatch} from "../../state/store";
import {addTodolistThunk, getTodolistsThunk, TodolistDomainType} from "../../state/todolists-reducer";
import {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import TodoList from "./Todolist/TodoList";
import {useAppDispatch} from "../../state/hooks";


export const TodolistList = () => {
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists);
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();

    const setPrevState = () => {
        // setTasks(previousState);
    }

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistThunk(title))
        // dispatch(addTodolistAC(title))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTodolistsThunk());
    }, [])

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map((tl: TodolistDomainType) => {
                return (
                    <Grid item key={tl.id}>
                        <Paper style={{padding: "20px", width: "300px"}}>
                            <TodoList todolist={tl}/>
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    </>
}