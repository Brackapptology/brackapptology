import axios from 'axios';
import { GET_BPI } from './index';

export const GET_CHAMPS = 'GET_CHAMPS';

export function getChamps(teams) {
    return {
        type: GET_CHAMPS,
        teams
    }
}

export function fetchChamps() {
    return function thunk(dispatch) {
        let confs = {};
    
        return axios.get('/api/espn/bpi/confchamps/1')
            .then(res => {
                confs = res.data;
                return confs;
            })
            .then(() => axios.get('/api/espn/bpi/confchamps/2'))
            .then(res => {
                let page2 = res.data;
                for (let key in confs) {
                    for (let conf in page2) {
                        if (!confs[conf]) {
                            confs[conf] = page2[conf];
                        }
                    }
                }
                return confs;
            })
            .then(() => axios.get('/api/espn/bpi/confchamps/3'))
            .then(res => {
                let page2 = res.data;
                for (let key in confs) {
                    for (let conf in page2) {
                        if (!confs[conf]) {
                            confs[conf] = page2[conf];
                        }
                    }
                }
                dispatch(getChamps(confs));                
            })
            .catch(console.error);
    }
}

export default function champsReducer(state = {}, action) {
    switch (action.type) {
        case GET_CHAMPS:
            return action.teams;
        default:
            return state;
    }
}