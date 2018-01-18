import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import createSeedlines from '../../utils/createSeedlines';

export default function UserBracket(props) {


        if (props.field && props.lastFour) {
        
        const seedLines = createSeedlines(props.field, props.lastFour);
            return (
                <div>
                {
                    seedLines.map((line, idx) => {
                        return (
                            <div key={idx}>
                                <h5>No. {idx + 1} seeds</h5>
                                {
                                    line.map(team => {
                                       return (
                                           <p key={team} className="new-bracket-team">{team}</p>
                                       )
                                   })
                                }
                            </div>
                        )
                    })
                }
                </div>

            )
        } else {
            return null;
        }
}