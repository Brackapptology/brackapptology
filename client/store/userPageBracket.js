import axios from 'axios';
import history from '../history';

const GET_BRACKET = 'GET_BRACKET';

export function getBracket(bracket) {
    return {
        type: GET_BRACKET,
        bracket
    }
}

// export function fetchUserBracket(userId, bracketId) {
//     return function thunk(dispatch) {
//         return axios.get(`/api/users/${userId}/brackets/${bracketId}`)
//             .then(res => res.data)
//             .then(bracket => {
//                 dispatch(getBracket(bracket.field));
//                 history.push(`/users/${userId}/brackets/${bracketId}`)
//             })
//             .catch(console.error)
//     }
// }

export default function userPageBracket(state = [], action) {
    switch (action.type) {
        case GET_BRACKET:
            return action.bracket;
        default:
            return state;
    }
}