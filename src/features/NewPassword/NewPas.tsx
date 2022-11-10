import React from 'react';
import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import {Navigate, useParams} from "react-router-dom";
import {newPassTC} from "../../bll/newPasReducer";


export const NewPas = () => {
    const dispatch = useAppDispatch()
    const passwordChanged = useAppSelector(state => state.newPasReducer.passwordChanged)

    console.log(useParams())
    const {token} = useParams()

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        onSubmit: values => {
            console.log(values.password)
            if (token) {
                dispatch(newPassTC(token, values.password))
            }
        },
    });

    if (passwordChanged) {
        return <Navigate to={'/login'}/>
    }
    return (
        <>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <Typography variant="h6" component="h5">Create new password</Typography>
                            <FormGroup>
                                <TextField
                                    label="password"
                                    margin="normal"
                                    {...formik.getFieldProps('password')}/>
                                <Typography>
                                    Create new password and we will send you further instructions to email
                                </Typography>
                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Create new password
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </>
    )
};

