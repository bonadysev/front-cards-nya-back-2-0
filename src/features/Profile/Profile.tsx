import React from 'react';
import {useAppSelector} from "../../bll/store";
import {Navigate} from "react-router-dom";
import {ProfileInfo} from "./ProfileInfo";

export const Profile = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const avatar = useAppSelector(state => state.auth.data.avatar)
    const name = useAppSelector(state => state.auth.data.name)
    const publicCardPacksCount = useAppSelector(state => state.auth.data.publicCardPacksCount)
    const email = useAppSelector(state => state.auth.data.email)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <ProfileInfo
                avatar={avatar}
                name={name}
                publicCardPacksCount={publicCardPacksCount}
                email={email}
            />
        </>
    );
};

