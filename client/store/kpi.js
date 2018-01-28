import axios from 'axios';

const GET_KPI = 'GET_KPI';

export function getKPI(teams) {
    return {
        type: GET_KPI,
        teams
    }
}

export function fetchKPI() {
    return function thunk(dispatch) {
        return axios.get('/api/kpi')
            .then(res => dispatch(getKPI(res.data)))
            .catch(console.error)
    }
}

export default function kpiReducer(state = [], action) {
    switch (action.type) {
        case GET_KPI:
            return action.teams;
        default:
            return state;
    }
}