import axios from 'axios'

const GET_INACTIVE_USER = 'GET_INACTIVE_USER';

export const getInactiveUser = (user) => {
    return {
        type: GET_INACTIVE_USER,
        user
    }
}

export function fetchInactiveUser(id) {
    return function thunk(dispatch) {
        return axios.get(`/api/users/${id}`)
            .then(res => res.data)
            .then(user => dispatch(getInactiveUser(user)))
            .catch(console.error)
    }
}

export default function inactiveUser(state = {}, action) {
    switch (action.type) {
        case GET_INACTIVE_USER:
            return action.user;
        default:
            return state;
    }
}