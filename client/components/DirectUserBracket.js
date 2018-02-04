import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import createSeedlines from '../../utils/createSeedlines';
import SeedLines from './SeedLines';
import BracketSidebar from './BracketSidebar';
import ShareButtons from './ShareButtons';
import formatDate from '../../utils/formatDate';
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
                        <ShareButtons
                        url={`https://brackapptology.herokuapp.com/users/${Number(this.props.match.params.userId)}/brackets/${Number(this.props.match.params.bracketId)}`}
                        title={`${this.props.user.name}'s newest bracketology`}
                        quote={`${this.props.user.name}'s newest bracketology via Brackapptology`}
                        />
                        <SeedLines seedLines={seedLines} />
                    </div>
                    <BracketSidebar lastFour={bracket.lastFour} field={bracket.field} />
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
