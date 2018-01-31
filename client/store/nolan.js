import axios from 'axios';

export const GET_NOLAN = 'GET_NOLAN';

export function getNolan(teams) {
    return {
        type: GET_NOLAN,
        teams
    }
}

export function fetchNolan() {
    return function thunk(dispatch) {
        return axios.get('/api/nolan')
            .then(res => dispatch(getNolan(res.data)))
            .catch(console.error)
    }
}

export default function nolanReducer(state = [], action) {
    switch (action.type) {
        case GET_NOLAN:
            return action.teams;
        default:
            return state;
    }
}
