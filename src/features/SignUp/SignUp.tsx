import React from 'react';
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {useFormik} from "formik";
import {registeredCT} from "../../bll/registrationReducer";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Navigate} from "react-router-dom";
import Typography from "@mui/material/Typography";


type FormikErrorType = {
    email?: string
    password?: string
}

export const SignUp = () => {
    const dispatch = useAppDispatch()
    const registered = useAppSelector(state => state.registration.registered)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
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
            dispatch(registeredCT(values))
        },
    });

    if (registered) {
        return <Navigate to={'/login'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <Typography variant="h5" component="h5">Sign up</Typography>
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


                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Register
                        </Button>
                        <p>Already have a account?
                            <a href={'http://localhost:3000/login'}
                            > Sign In
                            </a>
                        </p>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
};
