import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "./authReducer";
import {RegistrationActionType, registrationReducer} from "./registrationReducer";
import {ForgotPasActionsType, forgotPasReducer} from "./forgotPasReducer";
import {newPasReducer, NewPassActionsType} from "./newPasReducer";
import {packReducer, PackReducerActionsType} from "./packReducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    registration: registrationReducer,
    forgotPas: forgotPasReducer,
    newPasReducer: newPasReducer,
    pack: packReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType =
    | AuthActionsType
    | RegistrationActionType
    | AppActionsType
    | ForgotPasActionsType
    | NewPassActionsType
    | PackReducerActionsType

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>
export type DispatchActionType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<DispatchActionType>()

export default store
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;