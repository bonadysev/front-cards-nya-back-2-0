import {ThunkType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {CardPack, packAPI} from "../api/pack-api";
import {AxiosError} from "axios";

const initialState = {
    // cardPacks: [{
    //     _id: "5eb6cef840b7bf1cf0d8122d",
    //     user_id: "5eb543f6bea3ad21480f1ee7",
    //     name: "no Name",
    //     cardsCount: 25,
    //     created: "2020-05-09T15:40:40.339Z",
    //     updated: "2020-05-09T15:40:40.339Z"
    // }],
    cardPacks: [] as CardPack[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 3,
    token: '',
    tokenDeathTime: 0,

    packName: '',
    sortBy: '',
    order: 'desc',
    packOwner: 'all',
    minSort: 0,
    maxSort: 0,
}
type InitialStateType = typeof initialState

export const packReducer = (state: InitialStateType = initialState, action: PackReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {
                ...state,
                cardPacks: action.cardPacks
            }
        case 'PACKS/SET-PAGE-COUNT':
            return {
                ...state,
                pageCount: action.pageCount
            }
        case 'PACKS/SET-CURRENT-PAGE':
            return {
                ...state,
                page: action.data
            }
        case "PACKS/SET-CARDS-PACK-TOTAL-COUNT":
            return {
                ...state,
                cardPacksTotalCount:action.cardsPTC
            }
        default:
            return state
    }
}

// actions
export const setCardPacks = (cardPacks: any) => ({type: 'PACKS/SET-PACKS', cardPacks} as const)
export const setPageCount = (pageCount: any) => ({type: 'PACKS/SET-PAGE-COUNT', pageCount} as const)
export const setCurrentPage = (data: any) => ({type: 'PACKS/SET-CURRENT-PAGE', data} as const)
export const setCardsPTC = (cardsPTC: any) => ({type: 'PACKS/SET-CARDS-PACK-TOTAL-COUNT', cardsPTC} as const)


// thunks
export const getPacksTC = (pCount: any, page: any): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    packAPI.getPack({pageCount: pCount, page: page})
        .then((res) => {
            dispatch(setCardPacks(res.data.cardPacks))
            dispatch(setCardsPTC(res.data.cardPacksTotalCount))
            dispatch(setCurrentPage(res.data.page))
        })
        .catch((error: AxiosError) => {
            dispatch(setAppErrorAC(error.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}

//type
export type PackReducerActionsType =
    | ReturnType<typeof setCardPacks>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setCardsPTC>

