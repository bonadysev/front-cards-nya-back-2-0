import axios from 'axios'
import {LoginResponseType} from "../bll/authReducer";

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    withCredentials: true
})

// api
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>('auth/login', data)
    },
    logout() {
        return instance.delete<{info: string}>('auth/me')
    },
    registration(data: RegistrationParamsType) {
        return instance.post('auth/register', data)
    },
    forgot(data:ForgotParamsType) {
        return instance.post('auth/forgot', data)
    },
    newPassword(data:NewPasswordParamsType) {
        return instance.post('auth/set-new-password',data)
    },
    authMe() {
        return instance.post<LoginResponseType>('/auth/me')
    },
    updateNickName(data:UpdateNickNameType) {
        return instance.put('/auth/me', data)
    }
}

// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type RegistrationParamsType = {
    email: string
    password: string
}

export type ForgotParamsType = {
    email: string
    from: string
    message: string
}

export type NewPasswordParamsType = {
    password: string
    resetPasswordToken: string
}

export type UpdateNickNameType = {
    name: string
    avatar: string
}