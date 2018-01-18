
const GET_LASTFOURS = 'GET_LASTFOURS';
const ADD_LASTFOUR = 'ADD_LASTFOUR';

export const getLastFours = (lastFours) => {
    return {
        type: GET_LASTFOURS,
        lastFours
    }
}

export const addLastFour = (lastFour) => {
    return {
        type: ADD_LASTFOUR,
        lastFour
    }
}


export default function currentUserLastFoursReducer(state = [], action) {
    switch (action.type) {
        case GET_LASTFOURS:
            return action.lastFours;
        case ADD_LASTFOUR:
            return [...state, action.lastFour];
        default:
            return state;
    }
}