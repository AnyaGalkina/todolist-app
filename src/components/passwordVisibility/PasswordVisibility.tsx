import React, {memo} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type PropsType = {
    toggleShowPassword: any;
    passwordType: string;
}

export const PasswordVisibility = memo(({passwordType, toggleShowPassword}: PropsType) => {

    return (
        <span onClick={toggleShowPassword}>
             {passwordType === "password" ? <Visibility/> : <VisibilityOff/>}
        </span>
    )
});
