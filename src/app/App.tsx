import React, {useEffect} from "react";
import "./App.css";
import Header from "../components/Header/Header";
import Container from "@mui/material/Container";
import {AppRootState, useAppSelector} from "../state/store";
import {TodolistList} from "../features/Todolists/TodolistsList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbars} from "../components/Snackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {RequestStatusType, setInitializedTC} from "./app-reducer";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import PageNotFound from "../components/404/404";
import {useAppDispatch} from "../state/hooks";


function App() {
    const requestStatus = useSelector<AppRootState, RequestStatusType>(state => state.app.status);
    const isInitialized = useAppSelector(state => state.app.isInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setInitializedTC());
    }, []);

    if (!isInitialized) {
        return (
            <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
                <CircularProgress color="primary"/>
            </div>
        )
    }

    return (
        <div className="App">
            <Header/>
            {requestStatus === "loading" && <LinearProgress/>}
            <ErrorSnackbars/>
            <Container fixed>
                <Routes>
                    <Route path={"/todolist-app"} element={<TodolistList/>}/>
                    <Route path={"/todolist-app/login"} element={<Login/>}></Route>
                    <Route path={"/404"} element={<PageNotFound/>}/>
                    <Route path="*" element={<Navigate to={"/404"}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;


