import React from 'react';
import {Form, Formik} from 'formik'
import * as yup from 'yup'
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {registeredCT} from "../../bll/registrationReducer";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {Link, Navigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import {ErrorSnackbar} from "../../components/ErrorSnackbar";


export function SignUp2() {
    const dispatch = useAppDispatch()
    const registered = useAppSelector(state => state.registration.registered)
    const validationsSchema = yup.object().shape({
        password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательно'),
        email: yup.string().email('Введите верный email').required('Обязательно'),
        confirmEmail: yup.string().email('Введите верный email').oneOf([yup.ref('email')], 'Email не совпадают').required('Обязательно')
    })

    if (registered) {
        return <Navigate to={'/login'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <Formik
                initialValues={{
                    email: '',
                    confirmEmail: '',
                    password: '',
                    confirmPassword: ''
                }}
                validateOnBlur
                onSubmit={({email, password}) => {
                    // const newValues = {
                    //     email: values.email,
                    //     password: values.password
                    // }
                    // dispatch(registeredCT(newValues))
                  // const {email, password} = values
                    // const newValue = {
                    //   email,
                    //     password
                    // }
                    dispatch(registeredCT({email, password}))
                }}
                validationSchema={validationsSchema}
            >
                {({values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      isValid, handleSubmit,
                      dirty
                }) => (
                    <Form>
                    <FormControl>
                        <Typography variant="h5" component="h5">Sign up</Typography>
                        <FormGroup>
                            <TextField
                                label="email"
                                margin="normal"
                                className={'input'}
                                type={`email`}
                                name={`email`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {touched.email && errors.email && <p className={'error'}>{errors.email}</p>}

                            <TextField
                                label="confirmEmail"
                                margin="normal"
                                className={'input'}
                                type={`email`}
                                name={`confirmEmail`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmEmail}
                            />
                            {touched.confirmEmail && errors.confirmEmail &&
                                <p className={'error'}>{errors.confirmEmail}</p>}

                            <TextField
                                label="password"
                                margin="normal"
                                className={'input'}
                                type={`password`}
                                name={`password`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {touched.password && errors.password &&
                                <div style={{color: 'red'}} className={'error'}>{errors.password}</div>}

                            <TextField
                                label="confirmPassword"
                                margin="normal"
                                className={'input'}
                                type={`password`}
                                name={`confirmPassword`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                            />
                            {touched.confirmPassword && errors.confirmPassword &&
                                <div style={{color: 'red'}} className={'error'}>{errors.confirmPassword}</div>}
                            <Button type={`submit`} variant={'contained'} color={'primary'} disabled={!isValid || !dirty}>
                                Register
                            </Button>

                            <p>Already have a account?
                                <Typography variant="h6">
                                    <Link color="inherit" to={'/login'}>Sign In</Link>
                                </Typography>
                            </p>
                        </FormGroup>
                    </FormControl>
                    </Form>
                )}
            </Formik>
            <ErrorSnackbar/>
        </Grid>
    </Grid>
}
