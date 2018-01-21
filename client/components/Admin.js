import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { displayForm, fetchUsers, removeUserFromDBandStore } from '../store';
import EditUser from './EditUser';
import axios from 'axios';
import { RaisedButton } from 'material-ui';


class Admin extends Component {

    constructor() {
        super();
        this.state = {
            id: null,
            name: '',
            isAdmin: ''
        }
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    handleEdit(id, name, isAdmin) {
        this.setState({id, name, isAdmin})
        store.dispatch(displayForm(true))
    }

    delete(id) {
        axios.delete(`/api/users/${id}/delete`)
            .then(() => this.props.loadUsers())
    }

    render() {
        return (
            <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Administrator?</TableHeaderColumn>
                        <TableHeaderColumn>Edit</TableHeaderColumn>
                        <TableHeaderColumn>Delete</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                    this.props.users && this.props.users.map(user => {
                        return (
                            <TableRow key={user.id}>
                                <TableRowColumn>{user.id}</TableRowColumn>
                                <TableRowColumn>{user.name}</TableRowColumn>
                                <TableRowColumn>{user.isAdmin ? 'true' : 'false'}</TableRowColumn>
                                <TableRowColumn><RaisedButton label="Edit" onClick={this.handleEdit.bind(this, user.id, user.name, user.isAdmin)} /></TableRowColumn>
                                <TableRowColumn><RaisedButton label="Delete" onClick={this.delete.bind(this, user.id)} /></TableRowColumn>
                            </TableRow>
                        )
                    })
                }
                </TableBody>
            </Table>
            {
                this.props.displayForm
                    ?
                    <EditUser id={this.state.id} name={this.state.name} isAdmin={this.state.isAdmin} adminEdit={true} />
                    :
                    null
            }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        displayForm: state.displayEditUser,
        users: state.allUsers
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadUsers() {
            dispatch(fetchUsers());
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Admin));