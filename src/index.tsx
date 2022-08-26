import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import { CssBaseline, ThemeProvider} from "@mui/material";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {HashRouter} from "react-router-dom";
import {theme} from "./app/theme";



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
