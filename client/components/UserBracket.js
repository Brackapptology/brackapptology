import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import createSeedlines from '../../utils/createSeedlines';
import formatDate from '../../utils/formatDate';
import {Divider, RaisedButton} from 'material-ui';

export default function UserBracket(props) {


    if (props.field && props.lastFour) {

        const seedLines = createSeedlines(props.field, props.lastFour);
        return (
            <div className="user-bracket">
                <div className="user-bracket-field">
                <h3>{formatDate(props.date)}</h3>
                <NavLink to={props.url}><RaisedButton label="Share this bracket" /></NavLink>
                    {
                        seedLines.map((line, idx) => {
                            return (
                                <div key={idx}>
                                    <h5>No. {idx + 1} seeds</h5>
                                    <div className="new-bracket-seed-line">
                                    {
                                        line.map(team => {
                                            return (
                                                <p key={team} className="new-bracket-team">{team}</p>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="user-bracket-sidebar">
                    <div className="user-bracket-last-four">
                        <h3>Last Four In</h3>
                        {
                            props.lastFour.map(team => {
                                return (
                                    <p key={team}>{team}</p>
                                )
                            })
                        }
                    </div>
                    <Divider />
                    <div className="user-bracket-bubble-burst">
                        <h3>Bubbles burst</h3>
                        {
                            props.field.slice(64).map(team => {
                                return (
                                    <p key={team}>{team}</p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        )
    } else {
        return null;
    }
}