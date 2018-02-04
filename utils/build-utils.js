import axios from 'axios';
import store, { addBracket } from '../client/store';

function find68(field) {
    const oldField = field;
    let newField = [];
    let atLarge = 0;
    let teamsInField = 0;
    let lastFour = [];
    let bubblePop = [];

    oldField.forEach((teamObj, idx) => {
        if (teamObj.isChamp !== true && atLarge < 36 && teamsInField < 68) {
            if (atLarge > 31) {
                lastFour.push(teamObj.team);
            }
            atLarge++;
            teamsInField++;
            newField.push(teamObj.team);
        } else if (teamObj.isChamp === true && teamsInField < 68) {
            teamsInField++;
            newField.push(teamObj.team);
        } else if (teamObj.isChamp !== true && atLarge === 36 && bubblePop.length < 10) {
            bubblePop.push(teamObj.team);
        }
    })
    return { submitField: newField, lastFour, bubblePop, submitted: true }
}

function createBracket(submitField, lastFour, bubblePop) {
    const field = submitField.concat(lastFour).concat(bubblePop)
    axios.post('/api/bracket/create', {
        field,
        lastFour,
        bubblePop
    })
        .then(bracket => {
            store.dispatch(addBracket(bracket.data));
        })
        .catch(console.error)
}

module.exports = { find68, createBracket };