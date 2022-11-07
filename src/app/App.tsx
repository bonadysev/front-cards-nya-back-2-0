import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Route, Navigate, Link, Routes} from 'react-router-dom'
import logo from "../common/img/logo.svg";
import {Login} from "../features/Login/Login";
import Button from "@mui/material/Button";
import {Profile} from "../features/Profile/Profile";
import {useAppDispatch, useAppSelector} from "./store";
import {logoutTC} from "../bll/authReducer";
import LinearProgress from '@mui/material/LinearProgress';
import {SignUp2} from "../features/Login/SignUp2";
import {ForgotPas} from "../features/Login/ForgotPas";
import {NewPas} from "../features/Login/NewPas";
import {ErrorSnackbar} from "../components/ErrorSnackbar";



function App() {
    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const logOutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static" color={"transparent"}>
                <div><img src={logo} alt="логотип" />
                    <Typography variant="h5" component="h5">friday level project</Typography>
                    {isLoggedIn && <Button onClick={logOutHandler}>Log out</Button>}
                    <Link to = {'/'}> Profile </Link>
                    <Link to = {'/login'}> Sign in </Link>
                    <Link to = {'/signUp'}> Sign Up </Link>
                    <Link to = {'/forgot'}> Forgot password  </Link>
                    {status === 'loading' && <LinearProgress/>}
                </div>
            </AppBar>
            <Container>
                <Routes>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/'} element={<Profile/>}/>
                    <Route path={'/signUp'} element={<SignUp2/>}/>
                    <Route path={'/forgot'} element={<ForgotPas/>}/>
                    <Route path={'/set-new-password/:token'} element={<NewPas/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
