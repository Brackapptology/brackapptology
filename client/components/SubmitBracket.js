import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserBrackets } from '../store/index';

export default class SubmitBracket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            submitField: [],
            lastFour: [],
            bubblePop: []
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
        const newState = this.props.find68(this.props.field)
        this.setState(newState)
    };

    handleCancel = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        this.setState({ open: false });
        this.props.create(this.state.submitField, this.state.lastFour, this.state.bubblePop);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCancel}
            />,
            <NavLink to="/new-bracket">
                <FlatButton
                    label="Submit"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.handleSubmit}
                /></NavLink>,
        ];

        return (
            <div>
                <RaisedButton label="Submit" onClick={this.handleOpen} />
                <Dialog
                    title="Are you sure?"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    You cannot edit your bracketology once you submit.
          </Dialog>
            </div>
        );
    }
}