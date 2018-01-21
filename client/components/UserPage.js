import React, { Component } from 'react';
import { fetchUserBrackets, me, fetchUserPageData, fetchUserBracket } from '../store/index';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import UserBracket from './UserBracket';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import history from '../history';
import formatDate from '../../utils/formatDate';

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
            bracket: null,
            url: ''
        };
    }

    componentDidMount() {
        const id = Number(this.props.match.params.userId)
        this.props.loadBrackets(id);
        this.props.loadUser();
        this.props.loadUserPageInfo(id);
    }

    handleChange = (event, index, value) => {
        const bracktId = this.props.brackets.length;
        const url = `/users/${Number(this.props.match.params.userId)}/brackets/${bracktId}`
        this.setState({ 
            value, 
            bracket: this.props.brackets[bracktId - 1],
            url
        })
    };

    render() {
        let reversedBrackets = [];
        if (this.props.brackets) {
            for (let i = this.props.brackets.length - 1; i >= 0; i--) {
                reversedBrackets.push(this.props.brackets[i])
            }
        }
        return (
            <div className="user-page">
                {
                    this.props.user.id === Number(this.props.match.params.userId)
                        ?
                        <div className="user-page-top-chunk">
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
                            <div className="user-page-brackets">
                                <div className="user-page-selector-container">
                                    <h3>My brackets</h3>
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
                                                        reversedBrackets.map((entry, idx) => {
                                                            let date = formatDate(entry.date);
                                                            return (
                                                                <MenuItem
                                                                    key={idx}
                                                                    value={idx + 1}
                                                                    primaryText={date}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </SelectField>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <div className="user-page-bracket">
                                    {
                                        this.state.bracket
                                            ?
                                            <UserBracket
                                            field={this.state.bracket.field}
                                            lastFour={this.state.bracket.lastFour}
                                            date={this.state.bracket.date}
                                            url={this.state.url}
                                            />
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className="user-page-top-chunk">
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
                            <div className="user-page-brackets">
                                <div className="user-page-selector-container">
                                    <h3>{this.props.userPage && this.props.userPage.name}'s Brackets</h3>
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
                                                        reversedBrackets.map((entry, idx) => {
                                                            let date = formatDate(entry.date);
                                                            return (
                                                                <MenuItem
                                                                    key={idx}
                                                                    value={idx + 1}
                                                                    primaryText={date}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </SelectField>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <div className="user-page-bracket">
                                    {
                                        this.state.bracket
                                            ?
                                            <UserBracket
                                            field={this.state.bracket.field}
                                            lastFour={this.state.bracket.lastFour}
                                            date={this.state.bracket.date}
                                            url={this.state.url}
                                            />
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                }


            </div>
        )
    }
}

const mapState = (state) => {
    return {
        brackets: state.currentUserBrackets,
        user: state.activeUser,
        userPage: state.userPageInfo,
        userPageBracket: state.userPageBracket
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
        },
        loadUserBracket(userId, bracketId) {
            dispatch(fetchUserBracket(userId, bracketId))
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));