import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {HashRouter} from "react-router-dom";

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
    <HashRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </Provider>
    </HashRouter>
    ,
    document.getElementById("root"));

serviceWorker.unregister();
