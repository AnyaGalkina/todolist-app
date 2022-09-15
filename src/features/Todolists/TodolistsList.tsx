import {useSelector} from "react-redux";
import {AppRootState, useAppSelector} from "../../state/store";
import {addTodolistThunk, getTodolistsThunk, TodolistDomainType} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import TodoList from "./Todolist/TodoList";
import {useAppDispatch} from "../../state/hooks";
import {Navigate} from "react-router-dom";


export const TodolistList = () => {
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const dispatch = useAppDispatch();

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistThunk(title))
    }, [dispatch]);

    useEffect(() => {
        if(!isLoggedIn) {
            return
        }

        dispatch(getTodolistsThunk());
    }, [])


    if(!isLoggedIn) {
        return <Navigate to={"/todolist-app/login"}/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist} disabled={false}/>
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