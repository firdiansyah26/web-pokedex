import axios from 'axios';

const BASE_URL = 'https://pokeapi.co'
const HEADER = {
    'Content-Type': 'application/json'
}

export const URL = {
    DETAIL_POKEMON: "/api/v2/pokemon",
}

// GLOBAL API METHOE
export function GET(url) {
    return axios.get(BASE_URL + url, HEADER)
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        })
}
