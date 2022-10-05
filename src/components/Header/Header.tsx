import * as React from "react";
import {useCallback} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useAppSelector} from "../../state/store";
import {useAppDispatch} from "../../state/hooks";
import {logout} from "../../features/Login/auth-reducer";

export function Header() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
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
                    <IconButton size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6"
                                component="div"
                                sx={{flexGrow: 1}}>Todolist
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={onLoginClickHandler}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;

