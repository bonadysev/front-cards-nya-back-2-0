const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    token: '',
    tokenDeathTime: 0,
}
type InitialStateType = typeof initialState

export const packReducer = (state:InitialStateType = initialState, action: PackReducerActionsType):InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {...state, cardPacks: action.cardPacks}
        default:
            return state
    }
}

// actions
const setCardPacks = (cardPacks:any) => ({type: 'PACKS/SET-PACKS', cardPacks} as const)

// thunks

//type
export type PackReducerActionsType =
    | ReturnType<typeof setCardPacks>
