import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

// api
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<any>('auth/login', data)
    },
    logout() {
        return instance.delete<any>('auth/me')
    },
    registration(data: RegistrationParamsType) {
        return instance.post('auth/register', data)
    },
    forgot(data:any) {
        return instance.post('auth/forgot', data)
    },
    newPassword(data:any) {
        return instance.post('auth/set-new-password',data)
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
