import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Build extends Component {

    constructor() {
        super();
        this.state = {
            teams: {},
            field: []
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
                if (bpiTeam.startsWith(rpiTeam) && !rpi[rpiTeam].bpi) {
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
        const teams = this.state.teams;
        const field = this.state.field;

        return field.map((teamObj, idx) => {
            const team = Object.keys(teamObj)[0];
            return (
                <div key={team} className='team-card'>
                    <h3>{idx + 1 + '. ' + team}</h3>
                    {
                        teamObj[team].isChamp
                            ?
                            <h5>{teamObj[team].conf} <small>Proj. Champ</small></h5>
                            :
                            <h5>{teamObj[team].conf}</h5>
                    }
                    <h5>Record: {teamObj[team].record}</h5>
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
                            <button onClick={this.moveTeam.bind(this, idx, true)}>Move up</button>
                            :
                            null
                    }
                    {
                        idx < field.length - 1
                            ?
                            <button onClick={this.moveTeam.bind(this, idx, false)}>Move down</button>
                            :
                            null
                    }
                </div>
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

    render() {
        return (
            <div id='field'>
                {
                    this.populateTeamCards.call(this)
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        espnRPI: state.espnRPI,
        espnBPI: state.espnBPI,
        confChamps: state.confChamps
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
