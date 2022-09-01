import React, {useCallback, useEffect} from "react";
import "./App.css";
import Header from "../components/Header/Header";
import Container from "@mui/material/Container";
import {AppRootState} from "../state/store";
import {TodolistList} from "../features/Todolists/TodolistsList";
import {LinearProgress} from "@mui/material";
import {ErrorSnackbars} from "../components/Snackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./app-reducer";


function App() {
    const requestStatus = useSelector<AppRootState, RequestStatusType>(state => state.app.status);

    return (
        <div className="App">
            <Header/>
            { requestStatus === "loading" && <LinearProgress />}
            <ErrorSnackbars/>
            <Container fixed>
                <TodolistList  />
            </Container>
        </div>
    );
}

export default App;


