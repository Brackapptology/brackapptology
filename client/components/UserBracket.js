import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import createSeedlines from '../../utils/createSeedlines';
import formatDate from '../../utils/formatDate';
import { Divider, RaisedButton } from 'material-ui';
import SeedLines from './SeedLines';
import BracketSidebar from './BracketSidebar';

export default function UserBracket(props) {

    if (props.field && props.lastFour) {

        const seedLines = createSeedlines(props.field, props.lastFour);
        return (
            <div className="user-bracket">
                <div className="user-bracket-field">
                    <h3>{formatDate(props.date)}</h3>
                    <NavLink to={props.url}><RaisedButton label="Share this bracket" /></NavLink>
                    <SeedLines seedLines={seedLines} />
                </div>
                <BracketSidebar field={props.field} lastFour={props.lastFour} />
            </div>
        )
    } else {
        return null;
    }
}