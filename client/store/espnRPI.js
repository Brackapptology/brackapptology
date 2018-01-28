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
        let newestPage = [];

        return axios.get('/api/espn/rpi/1')
            .then(res => {
                page1 = res.data;
                return page1;
            })
            .then(() => axios.get('/api/espn/rpi/2'))
            .then(res => {
                page2 = res.data;
                newestPage = page1.concat(page2);
                return newestPage
            })
            .then(() => axios.get('/api/espn/rpi/3'))
            .then(res => {
                page3 = res.data;
                newestPage = newestPage.concat(page3)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/rpi/4'))
            .then(res => {
                page4 = res.data;
                newestPage = newestPage.concat(page4)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/rpi/5'))
            .then(res => {
                page5 = res.data;
                newestPage = newestPage.concat(page5)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/rpi/6'))
            .then(res => {
                page6 = res.data;
                newestPage = newestPage.concat(page6)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/rpi/7'))
            .then(res => {
                page7 = res.data;
                newestPage = newestPage.concat(page7)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/rpi/8'))
            .then(res => {
                page8 = res.data;
                newestPage = newestPage.concat(page8)
                return newestPage;
            })
            .then(teams => dispatch(getRPI(teams)))
            .catch(console.error);
    }
}

export default function teamsReducer(state = [], action) {
    switch (action.type) {
        case GET_RPI:
            return action.teams;
        default:
            return state;
    }
}
