import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import history from '../history';

function NavMenu(props) {
    const { children, handleClick, id } = props;

    const navTo = (url) => {
      history.push(url)
    }

    return (
        <div>
            <IconMenu
                iconButtonElement={<IconButton><MenuIcon /></IconButton>}
            >
            <MenuItem value="5" primaryText="Home" onClick={() => navTo('/')} />
                {
                    id
                        ?
                        [
                            <MenuItem key="1" value="3" primaryText="My Page" onClick={() => navTo(`/users/${id}`)} />,
                            <MenuItem key="2" value="1" primaryText="Logout" onClick={handleClick} />
                        ]
                        :
                        [
                            <MenuItem key="3" value="1" primaryText="Login" onClick={() => navTo('/login')} />,
                            <MenuItem key="4" value="2" primaryText="Sign Up" onClick={() => navTo('/signup')} />
                        ]
                }

            </IconMenu>
            {children}
        </div>
    );
}


const mapState = (state) => {
    return {
        id: state.activeUser.id
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