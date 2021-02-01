import * as actionType from '../actionTypes'

export const handleState = (field, value) => {
    return {
        type: actionType.HANDLE_STATE_DETAIL,
        field,
        value
    }
}

export const getDetailData = (param) => {
    return {
        type: actionType.GET_DETAIL_POKEMON,
        id: param
    }
}