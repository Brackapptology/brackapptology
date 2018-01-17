import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRPI, fetchBPI, fetchChamps } from '../store/index';
import RaisedButton from 'material-ui/RaisedButton';
import Progress from './Progress';

class Home extends Component {
    
    componentDidMount() {
        this.props.loadInitialData();
    }
    
    render() {
       if (Object.keys(this.props.espnRPI).length === 351 && Object.keys(this.props.espnBPI).length === 351) {
            return (
                <NavLink to='/build'><RaisedButton label="Build your bracket"/></NavLink>
            )
        } else {
            return (
                <Progress />
            )
        }
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
        loadInitialData() {
            dispatch(fetchRPI());
            dispatch(fetchBPI());
            dispatch(fetchChamps());
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Home));