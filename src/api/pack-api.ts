// api
import {instance} from "./auth-api";

export const packAPI = {
    getPack({packName, min, max, sortPacks, page, pageCount, user_id}: ParamsPack) {
        return instance.get('/cards/pack', {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                user_id
            }
        })
    }
}


// types
export type ParamsPack = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}

export type Pack = {
    cardPacks: CardPack[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

export type CardPack = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}

export type CardPack2 = {
    cardsCount: number
    created: string
    deckCover: boolean
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}