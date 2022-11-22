import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import {Route, Navigate, Routes} from 'react-router-dom'
import logo from "../assets/img/logo.svg";
import {Login} from "../features/Login/Login";
import {Profile} from "../features/Profile/Profile";
import {useAppDispatch, useAppSelector} from "../bll/store";
import {SignUp2} from "../features/SignUp/SignUp2";
import {ForgotPas} from "../features/ForgotPassword/ForgotPas";
import {NewPas} from "../features/NewPassword/NewPas";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {Page404} from "../features/Page404/Page404";
import {Loader} from "../components/Loader";
import {authMeTC} from "../bll/app-reducer";
import {PacksList} from "../features/Packs/PacksList";
import ResponsiveAppBar from "../features/Profile/ResponsiveAppBar";


function App() {
    const dispatch = useAppDispatch()
    const status = useAppSelector((state) => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    React.useEffect(() => {
        dispatch(authMeTC())
    }, [])

    if (!isInitialized) return <Loader/>

    enum ROUTES {
        PROFILE = '/',
        LOGIN = '/login',
        SIGNUP = '/signUp',
        FORGOT = '/forgot',
        P404 = '/404',
        SET_NEW_PAS = '/set-new-password/:token',
        PACKSLIST= '/packlist'
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static" color={"transparent"}>
                <div>
                    <img src={logo} alt="логотип" />
                    {isLoggedIn && <ResponsiveAppBar/>}
                </div>
                {status === 'loading' && <Loader/>}
            </AppBar>
            <Container>
                <Routes>
                    <Route path={ROUTES.PROFILE} element={<Profile/>}/>
                    <Route path={ROUTES.LOGIN} element={<Login/>}/>
                    <Route path={ROUTES.SIGNUP} element={<SignUp2/>}/>
                    <Route path={ROUTES.FORGOT} element={<ForgotPas/>}/>
                    <Route path={ROUTES.SET_NEW_PAS} element={<NewPas/>}/>
                    <Route path={ROUTES.PACKSLIST} element={<PacksList/>}/>
                    <Route path={ROUTES.P404} element={<Page404/>}/>
                    <Route path="*" element={<Navigate to={ROUTES.P404}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
