import {Dispatch} from 'redux'
import {authAPI, LoginParamsType} from "../api/auth-api";
import {setAppErrorAC} from "../app/app-reducer";
import {AxiosError} from "axios";


const initialState = {
    isLoggedIn: false,
    data: {}
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value, data: action.data}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean, data: any) =>
    ({type: 'login/SET-IS-LOGGED-IN', value, data} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: any) => {
    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true, res.data))
        })
        .catch((error: AxiosError) => {
            console.log(error.message)
            dispatch(setAppErrorAC(error.message))
        })
}

export const logoutTC = () => (dispatch: Dispatch<AuthActionsType>) => {
    authAPI.logout()
        .then((res) => {
            dispatch(setIsLoggedInAC(false, res.data))
        })
        .catch((error: AxiosError) => {
            console.log(error.message)
        })
}


// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
