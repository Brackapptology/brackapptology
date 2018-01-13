import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRPI, fetchBPI } from '../store/index';

class Build extends Component {

    // componentDidMount() {
    //     this.props.loadRPI();
    //     this.props.loadBPI();
    // }



    render() {
        return (
            <div>
                {
                    this.props.espnBPI.map(team => {
                        return (
                            <ul key={Object.keys(team)[0]}>
                                <li>BPI: {team[Object.keys(team)[0]].bpi}</li>
                            </ul>
                        )
                    })
                }
                {
                    this.props.espnRPI.map(team => {
                        return (
                            <ul key={Object.keys(team)[0]}>
                                <li>Team: {Object.keys(team)[0]}</li>
                                <li>RPI: {team[Object.keys(team)[0]].rpi}</li>
                                <li>vs. RPI 1-25: {team[Object.keys(team)[0]].t25}</li>
                                <li>vs. RPI 26-50: {team[Object.keys(team)[0]].t50}</li>
                                <li>vs. RPI 51-100: {team[Object.keys(team)[0]].t100}</li>
                            </ul>
                        )
                    })
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
