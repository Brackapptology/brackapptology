import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import createSeedlines from '../../utils/createSeedlines';
import formatDate from '../../utils/formatDate';
import Divider from 'material-ui/Divider';
import { fetchBracket, fetchInactiveUser } from '../store/index';

class DirectUserBracket extends Component {

    componentDidMount() {
        this.props.loadBracket(Number(this.props.match.params.userId), Number(this.props.match.params.bracketId))
        this.props.loadUser(Number(this.props.match.params.userId))
    }

    render() {

        if (this.props.bracket.field && this.props.bracket.lastFour) {

        const bracket = this.props.bracket;
        const seedLines = createSeedlines(bracket.field, bracket.lastFour);

        return (
            <div className="user-bracket">
                <div className="user-bracket-field">
                <h3>{formatDate(bracket.date)}</h3>
                <h5>By {this.props.user.name}</h5>
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
                            bracket.lastFour.map(team => {
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
                            bracket.field.slice(72).map(team => {
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
        return null
    }
}

}

const mapState = (state) => {
    return {
        bracket: state.urlBracket,
        user: state.inactiveUser
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadBracket(userId, bracketId) {
            dispatch(fetchBracket(userId, bracketId))
        }, 
        loadUser(userId) {
            dispatch(fetchInactiveUser(userId))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(DirectUserBracket));
