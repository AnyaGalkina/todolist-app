import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"  style={{backgroundColor: "#66b1d1"}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;


// import React from "react";
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
//
// type PropsType = {}
//
//
// // https://colors.muz.li/palette/9999ff/66b1d1/78e2dd/c7f774/fff0aa
// const Header: React.FC = () => {
//     return (
//         <div>
//             <AppBar position="static">
//                 <Toolbar variant="dense"
//                          style={{backgroundColor: "#66b1d1"}}
//                 >
//                     <IconButton edge="start"
//                                 style={{backgroundColor: "#66b1d1"}}
//                                 aria-label="menu" sx={{ mr: 2 }}>
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6"
//                                 style={{backgroundColor: "#66b1d1"}}
//                                 component="div">
//                         Todolist
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//         </div>
//     );
// };
//
// export default Header;