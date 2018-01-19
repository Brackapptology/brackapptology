import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

function NavMenu(props) {
    const { children, handleClick, id } = props

    return (
        <div>
            <IconMenu
                iconButtonElement={<IconButton><MenuIcon /></IconButton>}
            >
            <NavLink to="/"><MenuItem value="5" primaryText="Home" /></NavLink>
                {
                    id
                        ?
                        <div>
                            <NavLink to={`/users/${id}`}><MenuItem value="3" primaryText="My Page" /></NavLink>
                            <a href="#" onClick={handleClick}><MenuItem value="1" primaryText="Logout" /></a>
                        </div>
                        :
                        <div>
                            <NavLink to="/login"><MenuItem value="1" primaryText="Login" /></NavLink>
                            <NavLink to="/signup"><MenuItem value="2" primaryText="Sign Up" /></NavLink>
                        </div>
                }

            </IconMenu>
            {children}
        </div>
    );
}


const mapState = (state) => {
    return {
        id: state.user.id
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleClick() {
            dispatch(logout())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(NavMenu))