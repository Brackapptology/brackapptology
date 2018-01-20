import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import store, { addBracket, addLastFour } from '../store';
import { Paper, RaisedButton } from 'material-ui';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import SubmitBracket from './SubmitBracket';

class Build extends Component {

    constructor() {
        super();
        this.state = {
            teams: {},
            field: [],
            submitField: [],
            lastFour: [],
            bubblePop: [],
            submitted: false
        }
    }

    componentDidMount() {
        this.combineRPIandBPI()
    }

    combineRPIandBPI() {
        const bpi = this.props.espnBPI;
        const rpi = this.props.espnRPI;
        const confChamps = this.props.confChamps;

        for (let conf in confChamps) {
            for (let bpiTeam in bpi) {
                if (confChamps[conf] === bpiTeam) {
                    bpi[bpiTeam].isChamp = true;
                }
            }
        }

        for (let bpiTeam in bpi) {
            for (let rpiTeam in rpi) {
                if (bpiTeam === rpiTeam && !rpi[rpiTeam].bpi) {
                    rpi[rpiTeam] = Object.assign(rpi[rpiTeam], bpi[bpiTeam])
                }
            }
        }


        const teams = Object.keys(rpi).map(team => {
            if (rpi[team].rpi < 86 || rpi[team].isChamp) {
                return { [team]: rpi[team] }
            }
        })

        const field = teams.filter(team => {
            return team !== undefined
        })

        this.setState({ teams: rpi, field });

    }

    populateTeamCards() {

        const style = {
            height: 440,
            width: 220,
            margin: 20,
            // textAlign: 'center',
            display: 'inline-block',
        };

        const field = this.state.field;

        return field.map((teamObj, idx) => {
            const team = Object.keys(teamObj)[0];
            return (
                // <Paper key={team} style={style} zDepth={5} className="team-card-paper">
                    <div className='team-card'>
                        <h3 className="team-card-name">{idx + 1 + '. ' + team}</h3>
                        {
                            teamObj[team].isChamp
                                ?
                                <h5 className="team-card-small-header">{teamObj[team].conf} <small>Proj. Champ</small></h5>
                                :
                                <h5 className="team-card-small-header">{teamObj[team].conf}</h5>
                        }
                        <h5 className="team-card-small-header">Record: {teamObj[team].record}</h5>
                        <p>BPI: {teamObj[team].bpi}</p>
                        <p>SOS: {teamObj[team].sos}</p>
                        <p>SOR: {teamObj[team].sor}</p>
                        <p>RPI: {teamObj[team].rpi}</p>
                        <p>vs. RPI 1-25: {teamObj[team].t25}</p>
                        <p>vs. RPI 26-50: {teamObj[team].t50}</p>
                        <p>vs. RPI 51-100: {teamObj[team].t100}</p>
                        {
                            idx > 0
                                ?
                                <ArrowUp onClick={this.moveTeam.bind(this, idx, true)} />
                                :
                                null
                        }
                        {
                            idx < field.length - 1
                                ?
                                <ArrowDown onClick={this.moveTeam.bind(this, idx, false)} />
                                :
                                null
                        }
                    </div>
                // </Paper>
            )
        })
    }

    moveTeam(idx, bool) {
        let teams = this.state.field;
        let focus = teams[idx];
        let moveDown = teams[idx - 1];
        let moveUp = teams[idx + 1];
        let tempA = focus;
        let tempB = moveDown;
        let tempC = moveUp;

        if (bool) {
            teams[idx] = moveDown;
            teams[idx - 1] = tempA;
        } else {
            teams[idx] = tempC;
            teams[idx + 1] = focus;
        }

        this.setState({ field: teams })
    }

    find68(field) {
        // const oldField = this.state.field;
        const oldField = field;
        let newField = [];
        let atLarge = 0;
        let teamsInField = 0;
        let lastFour = [];
        let bubblePop = [];

        oldField.forEach((teamObj, idx) => {
            const team = Object.keys(teamObj)[0];
            if (!teamObj[team].isChamp && atLarge < 36 && teamsInField < 68) {
                if (atLarge > 31) {
                    lastFour.push(team);
                }
                atLarge++;
                teamsInField++;
                newField.push(team);
            } else if (teamObj[team].isChamp && teamsInField < 68) {
                teamsInField++;
                newField.push(team);
            } else if (!teamObj[team].isChamp && atLarge === 36 && bubblePop.length < 10) {
                bubblePop.push(team);
            }
        })
        return { submitField: newField, lastFour, bubblePop, submitted: true }
        // this.setState({ submitField: newField, lastFour, bubblePop, submitted: true });
    }

    createBracket(submitField, lastFour, bubblePop) {
        // const lastFour = this.state.lastFour;
        // const bubblePop = this.state.bubblePop;
        // const field = this.state.submitField.concat(this.state.lastFour).concat(this.state.bubblePop);
       const field = submitField.concat(lastFour).concat(bubblePop)
        axios.post('/api/bracket/create', {
            field,
            lastFour,
            bubblePop
        })
            .then(bracket => {
                store.dispatch(addBracket(bracket.data.field));
                store.dispatch(addLastFour(bracket.data.lastFour));
            })
            .catch(console.error)
    }

    render() {
        return (
            <div>
                <SubmitBracket find68={this.find68} create={this.createBracket} field={this.state.field} />
                {/*
                    !this.state.submitted
                        ?
                        <RaisedButton label="Submit" onClick={this.find68.bind(this)} className="build-submit" />
                        :
                        (
                            <div>
                                <p>Are you sure?</p>
                                <NavLink to="/new-bracket"><RaisedButton label="Yes" onClick={this.createBracket.bind(this)} /></NavLink>
                            </div>
                        )

                    */}
                <div id='field'>
                    {
                        this.populateTeamCards.call(this)
                    }
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        espnRPI: state.espnRPI,
        espnBPI: state.espnBPI,
        confChamps: state.confChamps,
        userId: !!state.user.id
    }
}

const mapDispatch = (dispatch) => {
    return {
        // loadRPI() {
        //     dispatch(fetchRPI())
        // },
        // loadBPI() {
        //     dispatch(fetchBPI())
        // }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Build));
