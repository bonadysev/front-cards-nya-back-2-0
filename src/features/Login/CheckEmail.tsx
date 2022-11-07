import React from 'react';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

export const CheckEmail = () => {
    return (
        <div>
            <Typography variant="h6" component="h5">Check Email</Typography>
            We’ve sent an Email with instructions to example@mail.com
            <Typography variant="h6">
                <Link color="inherit" to={'/login'}> Back to login</Link>
            </Typography>
        </div>
    );
};

