import React from 'react';
import CardsTable from "./CardsTable";
import Typography from "@mui/material/Typography";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../bll/store";

export const PacksList = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Typography variant="h5" component="h5">Packs List</Typography>
            <CardsTable/>
        </>
    );
};
