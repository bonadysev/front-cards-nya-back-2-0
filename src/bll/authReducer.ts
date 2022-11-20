import {authAPI, LoginParamsType} from "../api/auth-api";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {ThunkType} from "./store";

export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error?: string
}

const initialState = {
    isLoggedIn: false,
    data: {} as LoginResponseType
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value, data: action.data}

        default:
            return state
    }
}


// actions
// TODO
export const setIsLoggedInAC = (value: boolean, data: any) =>
    ({type: 'LOGIN/SET-IS-LOGGED-IN', value, data} as const)


// thunks
export const loginTC = (data: LoginParamsType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true, res.data))
        })
        .catch((error: AxiosError) => {
            console.log(error.message)
            dispatch(setAppErrorAC(error.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}


export const _loginTC = (data: LoginParamsType): ThunkType => async (dispatch) => {
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedInAC(true, res.data))
    } catch (error: any) {
        console.log(error.message)
        dispatch(setAppErrorAC(error.message))
    }
}

export const logoutTC = (): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logout()
        .then((res) => {
            dispatch(setIsLoggedInAC(false, res.data))
        })
        .catch((error: AxiosError) => {
            console.log(error.message)
        })
        .finally(()=>{
            dispatch(setAppStatusAC("idle"))
        })
}


// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

