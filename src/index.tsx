import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {App, theme} from './app';
import { CssBaseline, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {store} from './state';
import {BrowserRouter} from "react-router-dom";



ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById("root"));
