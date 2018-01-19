import React, { Component } from 'react';
import { fetchUserBrackets, me } from '../store/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UserBracket from './UserBracket';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
        this.props.loadBrackets(Number(this.props.match.params.userId));
        this.props.loadUser();
    }

    handleChange = (event, index, value) => this.setState({ value, bracket: this.props.brackets[value] });

    render() {
        return (
            <div>
                <h3>{this.props.user && this.props.user.name}'s Brackets</h3>
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
        user: state.user
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadBrackets(id) {
            dispatch(fetchUserBrackets(id))
        },
        loadUser() {
            dispatch(me())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(UserPage));