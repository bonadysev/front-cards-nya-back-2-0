import React from 'react';
import Typography from "@mui/material/Typography";
import {useAppSelector} from "../../bll/store";
import {Navigate} from "react-router-dom";

export const Profile = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <Typography variant="h5" component="h5">Profile</Typography>
    );
};

