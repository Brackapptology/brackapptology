import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRPI, fetchBPI } from '../store/index';

class Build extends Component {

    constructor() {
        super();
        this.state = {
            teams: {},
            teamNames: []
        }
    }

    componentDidMount() {
        this.combineRPIandBPI()
    }

    combineRPIandBPI() {
        const bpi = this.props.espnBPI;
        const rpi = this.props.espnRPI;

        for (let bpiTeam in bpi) {
            for (let rpiTeam in rpi) {
                if (bpiTeam.startsWith(rpiTeam) && !rpi[rpiTeam].bpi) {
                    rpi[rpiTeam] = Object.assign(rpi[rpiTeam], bpi[bpiTeam])
                }
            }
        }
        const teamNames = Object.keys(rpi)
        this.setState({ teams: rpi, teamNames });

    }

    populateTeamCards() {
        const teams = this.state.teams;
        const teamNames = this.state.teamNames;

        return teamNames.map(team => {
            return (
                <div key={team}>
                    <h3>{team}</h3>
                    <h5>{teams[team].conf}</h5>
                    <h5>Record: {teams[team].record}</h5>
                    <p>BPI: {teams[team].bpi}</p>
                    <p>SOS: {teams[team].sos}</p>
                    <p>SOR: {teams[team].sor}</p>
                    <p>RPI: {teams[team].rpi}</p>
                    <p>vs. RPI 1-25: {teams[team].t25}</p>
                    <p>vs. RPI 26-50: {teams[team].t50}</p>
                    <p>vs. RPI 51-100: {teams[team].t100}</p>
                </div>
            )
        })
        
        // for (let team in teams) {
        //     return (
        //         <div key={team}>
        //             <h3>{team}</h3>
        //             <h5>{teams[team].conf}</h5>
        //             <h5>Record: {teams[team].record}</h5>
        //             <p>BPI: {teams[team].bpi}</p>
        //             <p>SOS: {teams[team].sos}</p>
        //             <p>SOR: {teams[team].sor}</p>
        //             <p>RPI: {teams[team].rpi}</p>
        //             <p>vs. RPI 1-25: {teams[team].t25}</p>
        //             <p>vs. RPI 26-50: {teams[team].t50}</p>
        //             <p>vs. RPI 51-100: {teams[team].t100}</p>
        //         </div>
        //     )
        // }
    }

    render() {
        return (
            <div>
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
        espnBPI: state.espnBPI
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
