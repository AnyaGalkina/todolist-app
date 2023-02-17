// import {useSelector} from "react-redux";
import {addTodolist, getTodolists, TodolistDomainType} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from '../../components';
import {useAppDispatch} from '../../state';
import {Navigate} from "react-router-dom";
import {selectorIsLoggedIn} from '../Login';
import {selectorTodolists, TodoList} from '.';
import {useSelector} from 'react-redux';


export const TodolistList = () => {
    const todolists = useSelector(selectorTodolists);
    const isLoggedIn = useSelector(selectorIsLoggedIn);

    const dispatch = useAppDispatch();

    const addTodolistHandler = useCallback((title: string) => {
        dispatch(addTodolist({title}))
    }, [dispatch]);

    useEffect(() => {
        if(!isLoggedIn) {
            return
        }

        dispatch(getTodolists());
    }, [])


    if(!isLoggedIn) {
        return <Navigate to={"/todolist-app/login"}/>
    }

    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolistHandler} disabled={false}/>
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
