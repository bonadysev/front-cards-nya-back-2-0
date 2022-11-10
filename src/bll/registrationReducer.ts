import {authAPI} from "../api/auth-api";
import {AxiosError} from "axios";
import {setAppErrorAC} from "./app-reducer";
import {Dispatch} from "redux";


const initialState = {
    registered: false
}
type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'registration/REGISTERED':
            return {...state, registered: action.value}
        default:
            return state
    }
}

// actions
export const registeredAC = (value: boolean) =>
    ({type: 'registration/REGISTERED', value} as const)

// thunks
export const registeredCT = (data: {email: string, password: string}) => (dispatch: Dispatch) => {
    authAPI.registration(data)
        .then((res) => {
            dispatch(registeredAC(true))
        })
        .catch((error: AxiosError) => {
            dispatch(setAppErrorAC(error.message))
            console.log(error.message)
        })
}

// types
export type RegistrationActionType = ReturnType<typeof registeredAC>

