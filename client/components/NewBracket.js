import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import createSeedlines from '../../utils/createSeedlines';
import Divider from 'material-ui/Divider';

class NewBracket extends Component {

    componentDidMount() {
        this.render();
    }

    render() {

        if (this.props.newBracket && this.props.newLastFour) {

            const seedLines = createSeedlines(this.props.newBracket, this.props.newLastFour);
            return (
                <div className="user-bracket">
                    <div className="user-bracket-field">
                    {
                        this.props.isLoggedIn
                            ?
                            <h3>{this.props.user.name}'s new bracketology</h3>
                            :
                            <h3>Your new bracketology</h3>
                    }
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
                    <div className="user-bracket-sidebar">
                        <div className="user-bracket-last-four">
                            <h3>Last Four In</h3>
                            {
                                this.props.newLastFour.map(team => {
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
                                this.props.newBracket.slice(72).map(team => {
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
        newLastFour: state.userLastFours[state.userLastFours.length - 1],
        isLoggedIn: !!state.user.id,
        user: state.user
    }
}


export default withRouter(connect(mapState)(NewBracket));