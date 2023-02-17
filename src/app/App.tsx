import React, {useEffect} from "react";
import "./App.css";
import {Header} from "../components/Header/Header";
import Container from "@mui/material/Container";
import {TodolistList} from '../features';
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbars, PageNotFound} from '../components';
import {useSelector} from "react-redux";
import {setInitialized} from "./app-reducer";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from '../features';
import {useAppDispatch} from '../state';
import {selectIsInitialized, selectRequestStatus} from './selectors';


export function App () {
    const dispatch = useAppDispatch();

    const requestStatus = useSelector(selectRequestStatus);
    const isInitialized = useSelector(selectIsInitialized);

    useEffect(() => {
        dispatch(setInitialized());
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
