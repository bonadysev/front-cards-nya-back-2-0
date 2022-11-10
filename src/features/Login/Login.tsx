import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {loginTC} from "../../bll/authReducer";
import Typography from "@mui/material/Typography";


type FormikErrorType = {
    email?: string
    password?: string
    // rememberMe?: boolean
}


export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (values.password.length < 2) {
                errors.password = 'password must be more two symbols'
            }

            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <Typography variant="h5" component="h5">Sign in</Typography>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}/>

                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}

                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />

                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <FormControlLabel label={'Remember me'} control={
                            <Checkbox
                                checked={formik.values.rememberMe}
                                {...formik.getFieldProps('rememberMe')}
                            />}/>

                        <Typography variant="h6">
                            <Link color="inherit" to={'/forgot'}> Forgot password? </Link>
                        </Typography>

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Sign in
                        </Button>
                        <p>Already have an account?
                            <a href={'http://localhost:3000/signUp'}
                            > Sign Up
                            </a>
                        </p>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
