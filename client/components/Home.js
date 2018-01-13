import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRPI, fetchBPI } from '../store/index';

class Home extends Component {
    
    componentDidMount() {
        this.props.loadRPI();
        this.props.loadBPI();
    }
    
    render() {
        return (
            <NavLink to='/build'><button>Build your bracket</button></NavLink>
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
        loadRPI() {
            dispatch(fetchRPI())
        },
        loadBPI() {
            dispatch(fetchBPI())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Home));