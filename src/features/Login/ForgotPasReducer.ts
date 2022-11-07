import {authAPI} from "../../api/auth-api";
import {setAppErrorAC} from "../../app/app-reducer";
import {AxiosError} from "axios";


const initialState = {
    isChecked: false
}
type InitialStateType = typeof initialState

export const forgotPasReducer = (state: InitialStateType = initialState, action: ForgotPasActionsType): InitialStateType => {
    switch (action.type) {
        case "FORGOT-PAS/SET-FORGOT-PAS":
            return {...state, isChecked: action.val}
        default:
            return state
    }
}

// actions
export const setForgotPasAC = (val: boolean) =>
    ({type: 'FORGOT-PAS/SET-FORGOT-PAS', val} as const)

// thunks
export const forgotTC = (email: string) => (dispatch: any) => {
    let dataForgot = {
        email: email,
        from: "test-front-admin <ai73a@yandex.by>",
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`
    }
    authAPI.forgot(dataForgot)
        .then((res) => {
            dispatch(setForgotPasAC(true))
        })
        .catch((error: AxiosError) => {
            // const err = error as AxiosError
            console.log("error: " + error.message)
            dispatch(setAppErrorAC(error.message))
        })
}

// types
export type ForgotPasActionsType = ReturnType<typeof setForgotPasAC>