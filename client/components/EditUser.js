import React, { Component } from 'react';
import store, { displayForm, editUser } from '../store';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TextField, RaisedButton } from 'material-ui';
import { black } from 'material-ui/styles/colors';


class EditUser extends Component {

    handleSubmit(event) {
        event.preventDefault();
        let name = event.target.name.value;
        if (this.props.isAdmin) {
            let isAdmin = event.target.isAdmin.value;
            this.props.updateUser(this.props.id, name, isAdmin);
        } else {
            let email = event.target.email.value;
            let password = event.target.password.value;
            let photo = event.target.photo.value;
            this.props.updateUser(this.props.id, name, false, email, password, photo)
        }
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
                    {
                        this.props.adminEdit
                            ?
                            <div>
                                <TextField name="isAdmin" hintText="Is Admin?" hintStyle={{ color: black }} defaultValue={this.props.isAdmin} />
                                <br />
                            </div>
                            :
                            <div>
                                <TextField name="email" hintText="Email" hintStyle={{ color: black }} defaultValue={this.props.email} />
                                <br />
                                <TextField name="password" type="password" hintText="Password" hintStyle={{ color: black }} defaultValue={this.props.password} />
                                <br />
                                <TextField name="photo" hintText="Photo URL" hintStyle={{ color: black }} defaultValue={this.props.photo} />
                                <br />
                            </div>
                    }
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
        updateUser(id, name, isAdmin, email, password, photo) {
            dispatch(editUser(id, name, isAdmin, email, password, photo))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(EditUser));