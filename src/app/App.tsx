import React, {useCallback, useEffect} from "react";
import "./App.css";
import Header from "../components/Header/Header";
import Container from "@mui/material/Container";
import {addTodolistThunk, getTodolistsThunk, TodolistDomainType} from "../state/todolists-reducer";
import {AppRootState} from "../state/store";
import {TodolistList} from "../features/Todolists/TodolistsList";


function App() {

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <TodolistList  />
            </Container>
        </div>
    );
}

export default App;


