import React from 'react';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {logoutTC} from "../../bll/authReducer";
import {useAppDispatch, useAppSelector} from "../../bll/store";
import logo from "../Profile/img/profile.jpg";
import {Link} from "react-router-dom";


type ProfileInfoPropsType = {
    avatar?: string
    name: string
    publicCardPacksCount:number
    email:string
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = ({avatar, name,publicCardPacksCount,email}) => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div >
            <Typography variant="h6">
                <Link color="inherit" to={'/packlist'}>Back to Packs List</Link>
            </Typography>
            <Card sx={{maxWidth: 340}}>
                <CardMedia
                    component="img"
                    height="300"
                    image={logo}
                    alt="Personal Information"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Personal Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <div> Nickname:{name}</div>
                        <div> Email:{email}</div>
                        <div> Number of decks: {publicCardPacksCount}</div>
                    </Typography>
                </CardContent>
                <CardActions>
                    {isLoggedIn && <Button size="small" onClick={logOutHandler}>Log out</Button>}
                </CardActions>
            </Card>
        </div>
    );
};
