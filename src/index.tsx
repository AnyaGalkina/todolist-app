import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {yellow} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: "#66b1d1",
        },
        secondary: {
            main: "#9999ff",
        },
        success: {
            main: "#c7f774",
        },
        mode: "dark",
        background: {default: "#242e41", paper: "#2e3b52"},
    }
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App/>
    </ThemeProvider>
    ,
    document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
