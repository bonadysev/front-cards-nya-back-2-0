import {authAPI} from "../api/auth-api";
import {AxiosError} from "axios";
import {setAppErrorAC} from "./app-reducer";
import {Dispatch} from "redux";

const initialState = {
    passwordChanged: false
}
type InitialStateType = typeof initialState

export const newPasReducer = (state: InitialStateType = initialState, action: NewPassActionsType): InitialStateType => {
    switch (action.type) {
        case "NEW-PAS":
            return {...state, passwordChanged: action.val}
        default:
            return state
    }
}

// actions
export const newPasAC = (val: boolean) =>
    ({type: 'NEW-PAS', val} as const)

// thunks
export const newPassTC = (token: string, password: string) => (dispatch: Dispatch) => {

    let newGenPas = {
        password: password,
        resetPasswordToken: token
    }
    authAPI.newPassword(newGenPas)
        .then((res) => {
            dispatch(newPasAC(true))
        })
        .catch((error: AxiosError) => {
            console.log("error: " + error.message)
            dispatch(setAppErrorAC(error.message))
        })
}

// types
export type NewPassActionsType = ReturnType<typeof newPasAC>