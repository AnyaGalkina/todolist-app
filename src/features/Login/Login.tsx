import React, {useCallback, useState} from 'react';
import {
    Grid,
    InputAdornment,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Button
} from '@mui/material';
import {FormikErrors, FormikHelpers, useFormik} from 'formik';
import {useAppDispatch} from '../../state';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectorIsLoggedIn, ErrorInfo, DataForLogin, WarningText, login} from '.';
import {PasswordVisibility} from '../../components';

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
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrors<FormikValuesType> = {};

            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 2) {
                errors.password = 'Password should be minimum 2 symbols';
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

    const [passwordType, setPasswordType] = useState('password');

    const toggleShowPassword = useCallback(() => {
        passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')
    }, [passwordType]);


    if (isLoggedIn) {
        return <Navigate to={'/todolist-app'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>

                    <FormLabel>
                        <DataForLogin/>
                        <WarningText/>
                    </FormLabel>

                    <FormGroup style={{width: '340px'}}>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        <ErrorInfo touched={formik.touched.email} errors={formik.errors.email}/>

                        <TextField type={passwordType} label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                                   InputProps={{
                                       endAdornment: <InputAdornment position="end">
                                           <PasswordVisibility passwordType={passwordType}
                                                               toggleShowPassword={toggleShowPassword}/>
                                       </InputAdornment>
                                   }}
                        />
                        <ErrorInfo touched={formik.touched.password} errors={formik.errors.password}/>

                        <FormControlLabel label={'Remember me'} control={
                            <Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}
                            />}/>

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
