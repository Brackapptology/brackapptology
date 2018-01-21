import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import createSeedlines from '../../utils/createSeedlines';
import Divider from 'material-ui/Divider';

class NewBracket extends Component {

    componentDidMount() {
        this.render();
    }

    render() {

        if (this.props.newBracket && this.props.newBracket) {

            const seedLines = createSeedlines(this.props.newBracket.field, this.props.newBracket.lastFour);
            return (
                <div className="user-bracket-save">
                    <div className="user-bracket-field">
                    {
                        this.props.isLoggedIn
                            ?
                            <div>
                            <h3>{this.props.user.name}'s new bracketology</h3>
                            <NavLink to={`/users/${this.props.user.id}`}><h5 className="direct-user-bracket-name">Visit your page</h5></NavLink>
                            </div>
                            :
                            <h3>Your new bracketology</h3>
                    }
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
                                this.props.newBracket.lastFour.map(team => {
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
                                this.props.newBracket.field.slice(64).map(team => {
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
}

const mapState = (state) => {
    return {
        newBracket: state.currentUserBrackets[state.currentUserBrackets.length - 1],
        // newLastFour: state.userLastFours[state.userLastFours.length - 1],
        isLoggedIn: !!state.activeUser.id,
        user: state.activeUser
    }
}


export default withRouter(connect(mapState)(NewBracket));