import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class NewBracket extends Component {

    createSeedLines() {

    }

    render() {
        return (
            <div>
                {
                    this.props.newBracket.map((team, idx) => {
                        if (idx <= 3) {
                            return (
                                <div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        newBracket: state.currentUserBrackets[state.currentUserBrackets.length - 1],
        newLastFour: state.userLastFours[state.userLastFours.length - 1]
    }
}

export default withRouter(connect(mapState)(NewBracket));