import React from 'react';
import Divider from 'material-ui/Divider';

export default function BracketSidebar(props) {
    return (
        <div className="user-page-bracket-sidebar">
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
    )
}