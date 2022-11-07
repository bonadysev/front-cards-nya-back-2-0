import React from 'react';
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";

export const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <Typography variant="h5" component="h5">Profile</Typography>
    );
};

