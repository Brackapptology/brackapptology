import axios from 'axios';

const GET_BRACKET = 'GET_BRACKET';

export const getUrlBracket = (bracket) => {
    return {
        type: GET_BRACKET,
        bracket
    }
}

export function fetchBracket(userId, bracketId) {
    return function thunk(dispatch) {
        return axios.get(`/api/users/${userId}/brackets/${bracketId}`)
            .then(res => res.data)
            .then(bracket => {
                dispatch(getUrlBracket(bracket))
            }) 
            .catch(console.error)
    }
}


export default function currentUserBracketReducer(state = {}, action) {
    switch (action.type) {
        case GET_BRACKET:
            return action.bracket;
        default:
            return state;
    }
}