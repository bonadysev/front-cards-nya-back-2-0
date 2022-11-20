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

export const packReducer = (state:InitialStateType = initialState, action: any):InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

// actions

// thunks

//type

