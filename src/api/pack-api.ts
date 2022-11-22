// api
import {instance} from "./auth-api";

export const packAPI = {
    getPack({packName, min, max, sortPacks, page, pageCount, user_id}:ParamsPack){
        return instance.get('/cards/pack', {params: {
            packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                user_id}})
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
    cardPacks: []
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}