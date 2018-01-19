import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavMenu from './NavMenu';

const NavBar = () => {
    return (
        <AppBar
        title="Brackapptology"
        iconElementLeft={<NavMenu />}
        />
    )
}

export default NavBar;