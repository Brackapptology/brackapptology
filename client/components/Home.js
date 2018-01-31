import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRPI, fetchBPI, fetchChamps, fetchKPI, fetchNolan } from '../store/index';
import RaisedButton from 'material-ui/RaisedButton';
import Progress from './Progress';
import Build from './Build';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            hideButton: false
        }
    }

    componentDidMount() {
        this.props.loadInitialData();
    }

    hideButton() {
        this.setState({ hideButton: true })
    }

    render() {
        if (this.props.espnRPI.length > 340 && this.props.espnBPI.length > 340 && this.props.kpi.length > 340) {
            if (!this.state.hideButton) {
                return (
                    <div id="build-button">
                        <RaisedButton label="Build your bracket" onClick={this.hideButton.bind(this)} />
                    </div>
                )
            } else {
                return (
                    <Build />
                )
            }
        } else {
            return (
                <div id="progress">
                    <Progress />
                </div>
            )
        }
    }
}

const mapState = (state) => {
    return {
        espnRPI: state.espnRPI,
        espnBPI: state.espnBPI,
        confChamps: state.confChamps,
        kpi: state.kpi,
        nolan: state.nolan
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(fetchRPI());
            dispatch(fetchBPI());
            dispatch(fetchChamps());
            dispatch(fetchKPI());
            dispatch(fetchNolan());
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Home));