import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
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
                <div className="user-bracket-save">
                    <div className="user-bracket-field">
                        <h3>{formatDate(bracket.date)}</h3>
                        <NavLink to={`/users/${this.props.user.id}`}><h5 className="direct-user-bracket-name">By {this.props.user.name}</h5></NavLink>
                        <a 
                            className="twitter-share-button"
                            href={`https://twitter.com/intent/tweet?text=New%20Bracket%20By%20${this.props.user.name}&url=https%3A%2F%2Flocalhost%3A6800%2Fusers%2F${this.props.user.id}%2Fbrackets%2F${Number(this.props.match.params.bracketId)}%2F`}
                            data-size="large"
                            data-url="https://dev.twitter.com/web/tweet-button"
                            >
                            Tweet
                        </a>
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
                                bracket.field.slice(64).map(team => {
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
