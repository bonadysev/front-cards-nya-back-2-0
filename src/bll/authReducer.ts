import {authAPI, LoginParamsType, UpdateNickNameType} from "../api/auth-api";
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
        case "AUTH/UPDATE-NICKNAME":
            return {...state, data: action.value}

        //TODO Проделаю работу по повторению глубокого копирования
        // case 'AUTH/UPDATE-NICKNAME':
        //     return {
        //         ...state,
        //         data: {
        //             ...state.data,
        //             name: action.value
        //         }
        //     }
        default:
            return state
    }
}

// actions

export const setIsLoggedInAC = (value: boolean, data: any) =>
    ({type: 'LOGIN/SET-IS-LOGGED-IN', value, data} as const)

export const updateNickNameAC = (value: any) =>
    ({type: 'AUTH/UPDATE-NICKNAME', value} as const)


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
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}

export const updateNickNameTC = (newValue: string): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    const data: UpdateNickNameType = {
        name: newValue,
        avatar: ''
    }
    authAPI.updateNickName(data)
        .then((res) => {
            dispatch(updateNickNameAC(res.data.updatedUser))
        })
        .catch((error: AxiosError) => {
            console.log(error.message)
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })

}


// types
export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof updateNickNameAC>


