import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {FormikErrors, useFormik} from "formik";
import style from "./Login.module.css";
import {useAppSelector} from "../../state/store";
import {loginTC} from "./auth-reducer";
import {useAppDispatch} from "../../state/hooks";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrors<any> = {};

            if (!values.email) {
                    errors.email = "Email is required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (values.password.length < 2) {
                errors.password = "Password should be minimum 2 symbols";            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        },
    })

    if(isLoggedIn) {
        return <Navigate to={"/todolist-app"}/>
    }

    return <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a style={{color: "white"}} href={"https://social-network.samuraijs.com/"}
                               target={"_blank"}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div className={style.error}>{formik.errors.email}</div>}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div className={style.error}>{formik.errors.password}</div>}
                        <FormControlLabel label={"Remember me"} control={
                            <Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}/>
                        <Button type={"submit"} variant={"contained"} color={"primary"}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}