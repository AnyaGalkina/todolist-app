import * as React from "react";
import {useCallback} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch} from '../../state';
import {logout, selectorIsLoggedIn} from '../../features';
import {useSelector} from 'react-redux';

export function Header() {
    const isLoggedIn = useSelector(selectorIsLoggedIn);
    const dispatch = useAppDispatch();


    const onLoginClickHandler = useCallback(() => {
        dispatch(logout());
    }, [isLoggedIn]);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static"
                    style={{backgroundColor: "#66b1d1"}}
            >
                <Toolbar>
                    <Typography variant="h6"
                                component="div"
                                sx={{flexGrow: 1, margin: '0 20px'}}>Todolist
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={onLoginClickHandler}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;

