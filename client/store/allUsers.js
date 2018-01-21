import axios from 'axios';

const GET_USERS = 'GET_USERS';
const UPDATE_USER = 'UPDATE_USER';

export const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
}

export function fetchUsers() {
    return function thunk(dispatch) {
        return axios.get('/api/users')
            .then(res => res.data)
            .then(users => dispatch(getUsers(users)))
            .catch(console.error)
    }
}

export function editUser(id, name, isAdmin, email, password, photo) {
    let updateObj = {}
    if (!isAdmin) {
        updateObj = {name, email, password, photo}
    } else {
        updateObj = {name, isAdmin}
    }
    return function thunk(dispatch) {
        return axios.put(`/api/users/${id}/edit`, updateObj)
            .then(res => res.data)
            .then(user => dispatch(updateUser(user)))
            .catch(console.error)
    }
}

export default function allUsers(state = [], action) {
    switch (action.type) {
        case GET_USERS:
            return action.users;
        case UPDATE_USER:
            return state.filter(user => {
                return user.id !== action.user.id
            }).concat([action.user]);
        default:
            return state;
    }
}
