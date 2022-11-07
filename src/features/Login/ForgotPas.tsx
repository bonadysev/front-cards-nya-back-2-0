import React from 'react';
import Typography from "@mui/material/Typography";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {forgotTC} from "./ForgotPasReducer";
import {CheckEmail} from "./CheckEmail";
import {ErrorSnackbar} from "../../components/ErrorSnackbar";


export const ForgotPas = () => {
    const dispatch = useAppDispatch()
    const check = useAppSelector(state => state.forgotPas.isChecked)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => {
            console.log(values.email)
            dispatch(forgotTC(values.email))
        },
    });

    return (
        <>
            {
                check
                    ? <CheckEmail/>
                    : <Grid container justifyContent={'center'}>
                        <Grid item justifyContent={'center'}>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl>
                                    <Typography variant="h6" component="h5">Forgot you password?</Typography>
                                    <FormGroup>
                                        <TextField
                                            label="Email"
                                            margin="normal"
                                            {...formik.getFieldProps('email')}/>
                                        <Typography>
                                            Enter your email address and we will send you further instructions
                                        </Typography>
                                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                                            Send Instructions
                                        </Button>
                                        <Typography>
                                            Did you remember your password?
                                        </Typography>
                                        <Typography variant="h6">
                                            <Link color="inherit" to={'/login'}> Try logging in</Link>
                                        </Typography>
                                    </FormGroup>
                                </FormControl>
                            </form>
                            <ErrorSnackbar/>
                        </Grid>
                    </Grid>

            }
        </>
    )
};

