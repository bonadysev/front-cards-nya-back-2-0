import React from 'react';
import Typography from "@mui/material/Typography";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../bll/store";
import PackTable3 from "./PackTable3";


export const PacksList = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            {/*{packs.length === 0*/}
            {/*    ?  <Typography variant="h5" component="h5">у вас нет созданных колод</Typography>*/}
            {/*    : <>*/}
            {/*        <Typography variant="h5" component="h5">Packs List</Typography>*/}
            {/*        <PackTable3/>*/}
            {/*    </>*/}
            {/*}*/}
            <Typography variant="h5" component="h5">Packs List</Typography>
            <PackTable3/>
        </>
    );
};
