import React, { Component } from 'react';
import { fetchUserBrackets, me, fetchUserPageData } from '../store/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UserBracket from './UserBracket';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

const styles = {
    customWidth: {
        width: 150,
    },
};

class UserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            bracket: null
        };
    }

    componentDidMount() {
        const id = Number(this.props.match.params.userId)
        this.props.loadBrackets(id);
        this.props.loadUser();
        this.props.loadUserPageInfo(id);
    }

    handleChange = (event, index, value) => this.setState({ value, bracket: this.props.brackets[value] });

    render() {

        return (
            <div>
                {
                    this.props.user.id === Number(this.props.match.params.userId)
                        ?
                        <div>
                            <ListItem
                                className="user-page-header"
                                disabled={true}
                                leftAvatar={
                                    <Avatar
                                        src={this.props.user.photoUrl}
                                        size={75}
                                    />
                                }
                            >
                                <h1 className="user-page-header-name">{this.props.user && this.props.user.name}</h1>
                            </ListItem>
                            <h3>My brackets</h3>
                        </div>
                        :
                        <div>
                            <ListItem
                                className="user-page-header"
                                disabled={true}
                                leftAvatar={
                                    <Avatar
                                        src={this.props.userPage.photoUrl}
                                        size={75}
                                    />
                                }
                            >
                                <h1 className="user-page-header-name">{this.props.userPage && this.props.userPage.name}</h1>
                            </ListItem>
                            <h3>{this.props.userPage && this.props.userPage.name}'s Brackets</h3>
                        </div>

                }
                <div id="user-page-brackets">
                    <div className="bracket-date-selector">
                        {
                            this.props.brackets
                                ?
                                <SelectField
                                    floatingLabelText="Date"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                >
                                    {
                                        this.props.brackets.map((entry, idx) => {
                                            return (
                                                <MenuItem key={idx} value={idx} primaryText={entry.date} />
                                            )
                                        })
                                    }
                                </SelectField>
                                :
                                null
                        }
                    </div>
                    <div className="user-page-bracket">
                        {
                            this.state.bracket
                                ?
                                <UserBracket field={this.state.bracket.field} lastFour={this.state.bracket.lastFour} />
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        brackets: state.currentUserBrackets,
        user: state.user,
        userPage: state.userPageInfo
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadBrackets(id) {
            dispatch(fetchUserBrackets(id))
        },
        loadUser() {
            dispatch(me())
        },
        loadUserPageInfo(id) {
            dispatch(fetchUserPageData(id))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));