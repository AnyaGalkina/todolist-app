import React, {useCallback, useEffect} from "react";
import "./App.css";
import TodoList from "./components/Todolist/TodoList";
import AddItemForm from "./components/Input/AddItemForm";
import Header from "./components/Header/Header";
import Container from "@mui/material/Container";
import {Grid, Paper} from "@mui/material";
import {addTodolistAC, fetchTodolistsThunk, TodolistDomainType} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";




function App() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodolistDomainType>>(state => state.todolists);

    useEffect(() => {
        //@ts-ignore
       dispatch(fetchTodolistsThunk())
    }, [])

    const setPrevState = () => {
        // setTasks(previousState);
    }

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch]);


    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm
                        addItem={addTodolist}
                    />
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl: TodolistDomainType) => {
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "20px", width: "300px"}}>
                                    <TodoList todolist={tl} />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
