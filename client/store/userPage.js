import axios from 'axios';

const GET_USER_PAGE_INFO = 'GET_USER_PAGE_INFO';

export const getUserPageInfo = (user) => {
    return {
        type: GET_USER_PAGE_INFO,
        user
    }
}

export const fetchUserPageData = (id) => {
    return function thunk(dispatch) {
        return axios.get(`/api/users/${id}`)
            .then(user => dispatch(getUserPageInfo(user.data)))
            .catch(console.error);
    }
}

export default function userPageInfoReducer (state = {}, action) {
    switch (action.type) {
        case GET_USER_PAGE_INFO:
            return action.user;
        default:
            return state;
    }
}