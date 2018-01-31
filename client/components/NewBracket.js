import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import createSeedlines from '../../utils/createSeedlines';
import Divider from 'material-ui/Divider';
import SeedLines from './SeedLines';
import BracketSidebar from './BracketSidebar';

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
                        <SeedLines seedLines={seedLines} />
                    </div>
                    <BracketSidebar lastFour={this.props.newBracket.lastFour} field={this.props.newBracket.field} />
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
        isLoggedIn: !!state.activeUser.id,
        user: state.activeUser
    }
}


export default withRouter(connect(mapState)(NewBracket));