import React, { Component } from 'react';
import store, { displayForm, editUser } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {TextField, RaisedButton} from 'material-ui';
import {black} from 'material-ui/styles/colors';


class EditUser extends Component {

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name.value;
        let isAdmin = event.target.isAdmin.value;
        this.props.updateUser(this.props.id, name, isAdmin);
        store.dispatch(displayForm(false))
    }

    hideForm() {
        store.dispatch(displayForm(false));
    }

    render() {
        return (
            <div className="credential-form">
                <form onSubmit={this.handleSubmit.bind(this)} name={name}>
                    <TextField name="name" hintText="Name" hintStyle={{ color: black }} defaultValue={this.props.name} />
                    <br />
                    <TextField name="isAdmin" hintText="Is Admin?" hintStyle={{ color: black }} defaultValue={this.props.isAdmin} />
                    <br />
                    <div>
                        <RaisedButton label="Edit" type="submit" />
                        <RaisedButton label="Hide Form" onClick={this.hideForm.bind(this)} />
                    </div>
                </form>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        users: state.allUsers
    }
}

const mapDispatch = (dispatch) => {
    return {
        updateUser(id, name, isAdmin) {
            dispatch(editUser(id, name, isAdmin))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(EditUser));