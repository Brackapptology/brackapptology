import axios from 'axios'

const GET_BPI = 'GET_BPI';

export function getBPI(teams) {
    return {
        type: GET_BPI,
        teams
    }
}

export function fetchBPI() {
    return function thunk(dispatch) {
        let page1 = [];
        let page2 = [];
        let page3 = [];
        let page4 = [];
        let page5 = [];
        let page6 = [];
        let page7 = [];
        let page8 = [];
        let page9 = [];
        let page10 = [];
        let page11 = [];
        let page12 = [];
        let page13 = [];
        let page14 = [];
        let page15 = [];
        let newestPage = [];

        return axios.get('/api/espn/bpi/1')
            .then(res => {
                page1 = res.data;
                return page1;
            })
            .then(() => axios.get('/api/espn/bpi/2'))
            .then(res => {
                page2 = res.data;
                newestPage = page1.concat(page2)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/3'))
            .then(res => {
                page3 = res.data;
                newestPage = newestPage.concat(page3)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/4'))
            .then(res => {
                page4 = res.data;
                newestPage = newestPage.concat(page4)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/5'))
            .then(res => {
                page5 = res.data;
                newestPage = newestPage.concat(page5)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/6'))
            .then(res => {
                page6 = res.data;
                newestPage = newestPage.concat(page6)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/7'))
            .then(res => {
                page7 = res.data;
                newestPage = newestPage.concat(page7)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/8'))
            .then(res => {
                page8 = res.data;
                newestPage = newestPage.concat(page8)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/9'))
            .then(res => {
                page9 = res.data;
                newestPage = newestPage.concat(page9)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/10'))
            .then(res => {
                page10 = res.data;
                newestPage = newestPage.concat(page10)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/11'))
            .then(res => {
                page11 = res.data;
                newestPage = newestPage.concat(page11)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/12'))
            .then(res => {
                page12 = res.data;
                newestPage = newestPage.concat(page12)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/13'))
            .then(res => {
                page13 = res.data;
                newestPage = newestPage.concat(page13)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/14'))
            .then(res => {
                page14 = res.data;
                newestPage = newestPage.concat(page14)
                return newestPage;
            })
            .then(() => axios.get('/api/espn/bpi/15'))
            .then(res => {
                page15 = res.data;
                newestPage = newestPage.concat(page15)
                return newestPage;
            })
            .then(teams => dispatch(getBPI(teams)))
            .catch(console.error);
    }
}

export default function teamsReducer(state = [], action) {
    switch (action.type) {
        case GET_BPI:
            return action.teams;
        default:
            return state;
    }
}
