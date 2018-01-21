import axios from 'axios';

const GET_BRACKETS = 'GET_BRACKETS';
const ADD_BRACKET = 'ADD_BRACKET';

export const getBrackets = (brackets) => {
    return {
        type: GET_BRACKETS,
        brackets
    }
}

export const addBracket = (bracket) => {
    return {
        type: ADD_BRACKET,
        bracket
    }
}

export function fetchUserBrackets(userId) {
    return function thunk(dispatch) {
        return axios.get(`/api/users/${userId}/brackets`)
            .then(res => res.data)
            .then(brackets => {
                dispatch(getBrackets(brackets))
            }) 
            .catch(console.error)
    }
}

export default function currentUserBracketsReducer(state = [], action) {
    switch (action.type) {
        case GET_BRACKETS:
            return action.brackets;
        case ADD_BRACKET:
            return [...state, action.bracket];
        default:
            return state;
    }
}