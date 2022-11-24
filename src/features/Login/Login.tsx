import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {FormikErrors, FormikHelpers, useFormik} from "formik";
import style from "./Login.module.css";
import {login} from "./auth-reducer";
import {useAppDispatch} from "../../state/hooks";
import {Navigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import { selectorIsLoggedIn } from ".";
import WarningIcon from '@mui/icons-material/Warning';

type FormikValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const Login = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector(selectorIsLoggedIn);

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
                errors.password = "Password should be minimum 2 symbols";
            }
            return errors
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValuesType>) => {
            const res = await dispatch(login(values));
            if (login.rejected.match(res)) {
                //@ts-ignore
                if (res.payload?.fieldsErrors?.length) {
                    //@ts-ignore
                    const error = res.payload.fieldsErrors[0];
                    formikHelpers.setFieldError(error.field, error.error);
                }
            }
            formik.resetForm();
        },
    })

    if (isLoggedIn) {
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

                        <div className={style.warningBlock}>
                            <div className={style.warningText}>
                                <WarningIcon fontSize="large" style={{color: 'orange', paddingRight: '10px'}}/>
                                If you have some issue with log in using Safari, please follow instructions:
                            </div>
                            <div>
                                Click the Safari menu, you will see the Preferences item - click on it. Then click the Privacy item
                                to see privacy related options. You will see the Website tracking checkbox. Click on Prevent
                                cross-site tracking.
                            </div>
                        </div>
                    </FormLabel>
                    <FormGroup style={{width: "340px"}}>
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