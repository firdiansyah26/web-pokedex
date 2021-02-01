import {
    HANDLE_STATE_DETAIL, GET_DETAIL_POKEMON_SUCCESS
} from '../actionTypes'

const initState = {
    loader: false,
    catchField: null,
    detail: null,
    myPokemon: []
}

const detailReducer = (state = initState, action) => {
    switch (action.type) {
        case HANDLE_STATE_DETAIL:
            return {
                ...state, [action.field]: action.value
            }
        case GET_DETAIL_POKEMON_SUCCESS:
            return {
                ...state, detail: action.value
            }
        default:
            return state
    }
}

export default detailReducer