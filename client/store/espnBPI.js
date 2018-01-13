import axios from 'axios'

export const GET_BPI = 'GET_BPI';

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

        return axios.get('/api/espn/bpi/1')
            .then(res => {
                page1 = res.data;
                return page1;
            })
            .then(() => axios.get('/api/espn/bpi/2'))
            .then(res => {
                page2 = res.data;
                return page1.concat(page2);
            })
            .then(() => axios.get('/api/espn/bpi/3'))
            .then(res => {
                page3 = res.data;
                return page1.concat(page2).concat(page3);
            })
            .then(() => axios.get('/api/espn/bpi/4'))
            .then(res => {
                page4 = res.data;
                return page1.concat(page2).concat(page3).concat(page4);
            })
            .then(() => axios.get('/api/espn/bpi/5'))
            .then(res => {
                page5 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5);
            })
            .then(() => axios.get('/api/espn/bpi/6'))
            .then(res => {
                page6 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6);
            })
            .then(() => axios.get('/api/espn/bpi/7'))
            .then(res => {
                page7 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6).concat(page7);
            })
            .then(() => axios.get('/api/espn/bpi/8'))
            .then(res => {
                page8 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6).concat(page7).concat(page8);
            })
            .then(() => axios.get('/api/espn/bpi/9'))
            .then(res => {
                page9 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6).concat(page7).concat(page8)
                .concat(page9);
            })
            .then(() => axios.get('/api/espn/bpi/10'))
            .then(res => {
                page10 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6).concat(page7).concat(page8)
                .concat(page9).concat(page10);
            })
            .then(() => axios.get('/api/espn/bpi/11'))
            .then(res => {
                page11 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6).concat(page7).concat(page8)
                .concat(page9).concat(page10).concat(page11);
            })
            .then(() => axios.get('/api/espn/bpi/12'))
            .then(res => {
                page12 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6).concat(page7).concat(page8)
                .concat(page9).concat(page10).concat(page11).concat(page12);
            })
            .then(() => axios.get('/api/espn/bpi/13'))
            .then(res => {
                page13 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6).concat(page7).concat(page8)
                .concat(page9).concat(page10).concat(page11).concat(page12)
                .concat(page13);
            })
            .then(() => axios.get('/api/espn/bpi/14'))
            .then(res => {
                page14 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6).concat(page7).concat(page8)
                .concat(page9).concat(page10).concat(page11).concat(page12)
                .concat(page13).concat(page14);
            })
            .then(() => axios.get('/api/espn/bpi/15'))
            .then(res => {
                page15 = res.data;
                return page1.concat(page2).concat(page3).concat(page4)
                .concat(page5).concat(page6).concat(page7).concat(page8)
                .concat(page9).concat(page10).concat(page11).concat(page12)
                .concat(page13).concat(page14).concat(page15);
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
