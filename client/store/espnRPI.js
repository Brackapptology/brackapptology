import axios from 'axios'

export const GET_RPI = 'GET_RPI';

export function getRPI(teams) {
    return {
        type: GET_RPI,
        teams
    }
}

export function fetchRPI() {
    return function thunk(dispatch) {
        let page1 = [];
        let page2 = [];
        let page3 = [];
        let page4 = [];
        let page5 = [];
        let page6 = [];
        let page7 = [];
        let page8 = [];

        return axios.get('/api/espn/rpi/1')
            .then(res => {
                page1 = res.data;
                return page1;
            })
            .then(() => axios.get('/api/espn/rpi/2'))
            .then(res => {
                page2 = res.data;
                return Object.assign(page1, page2);
            })
            .then(() => axios.get('/api/espn/rpi/3'))
            .then(res => {
                page3 = res.data;
                return Object.assign(page1, page2, page3);
            })
            .then(() => axios.get('/api/espn/rpi/4'))
            .then(res => {
                page4 = res.data;
                return Object.assign(page1, page2, page3, page4);
            })
            .then(() => axios.get('/api/espn/rpi/5'))
            .then(res => {
                page5 = res.data;
                return Object.assign(page1, page2, page3, page4, page5);
            })
            .then(() => axios.get('/api/espn/rpi/6'))
            .then(res => {
                page6 = res.data;
                return Object.assign(page1, page2, page3, page4, page5, page6);
            })
            .then(() => axios.get('/api/espn/rpi/7'))
            .then(res => {
                page7 = res.data;
                return Object.assign(page1, page2, page3, page4, page5, page6, page7);
            })
            .then(() => axios.get('/api/espn/rpi/8'))
            .then(res => {
                page8 = res.data;
                return Object.assign(page1, page2, page3, page4, page5, page6, page7, page8);
            })
            .then(teams => dispatch(getRPI(teams)))
            .catch(console.error);
    }
}

export default function teamsReducer(state = {}, action) {
    switch (action.type) {
        case GET_RPI:
            return action.teams;
        default:
            return state;
    }
}
