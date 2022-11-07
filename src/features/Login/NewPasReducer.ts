import {authAPI} from "../../api/auth-api";
import {AxiosError} from "axios";
import {setAppErrorAC} from "../../app/app-reducer";

const initialState = {
    passwordChanged: false
}
type InitialStateType = typeof initialState

export const newPasReducer = (state: InitialStateType = initialState, action: newPassActionsType): InitialStateType => {
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
export const newPassTC = (token: any, password: string) => (dispatch: any) => {

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
export type newPassActionsType = ReturnType<typeof newPasAC>