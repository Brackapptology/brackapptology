import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRPI, fetchBPI, fetchChamps } from '../store/index';
import RaisedButton from 'material-ui/RaisedButton';
import Progress from './Progress';
import CredentialsDialog from './CredentialsDialog';

class Home extends Component {
    
    componentDidMount() {
        this.props.loadInitialData();
    }
    
    render() {
       if (Object.keys(this.props.espnRPI).length > 340 && Object.keys(this.props.espnBPI).length > 340) {
            return (
                <div>
                <NavLink to='/build'><RaisedButton label="Build your bracket" /></NavLink>
                <CredentialsDialog />
                </div>
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