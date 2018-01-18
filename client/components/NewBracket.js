import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';

class NewBracket extends Component {

    componentDidMount() {
        this.render();
    }

    render() {
        if (this.props.newBracket && this.props.newLastFour) {
            const field = this.props.newBracket;
            const lastFour = this.props.newLastFour;
            const lastFourStartIdx = field.indexOf(lastFour[0]);
            const lastFourTwoIdx = field.indexOf(lastFour[1]);
            const lastFourThreeIdx = field.indexOf(lastFour[2]);
            const lastFourEndIdx = field.indexOf(lastFour[3])
            let seed1 = field.slice(0, 4);
            let seed2 = field.slice(4, 8);
            let seed3 = field.slice(8, 12);
            let seed4 = field.slice(12, 16);
            let seed5 = field.slice(16, 20);
            let seed6 = field.slice(20, 24);
            let seed7 = field.slice(24, 28);
            let seed8 = field.slice(28, 32);
            let seed9 = field.slice(32, 36);
            let seed10 = [];
            let seed11 = [];
            let seed12 = [];
            let seed13 = [];
            let seed14 = [];
            let seed15 = field.slice(58, 62);
            let seed16 = field.slice(62, 68);

            let lastFourInLine = 0;
            let maxSpotsInLine = 5;
            let currentLine = 10;
            let registeredFour = [];

            for (let i = 36; i < 58; i++) {
             
                if (i === 36) {
                    maxSpotsInLine = 5;
                } else if (maxSpotsInLine === 1 && lastFourInLine === 0) {
                    currentLine++;
                    maxSpotsInLine = 5;
                } else if (maxSpotsInLine === 2 && lastFourInLine === 1) {
                    maxSpotsInLine--;
                } else if (maxSpotsInLine === 1 && lastFourInLine === 2) {
                    currentLine++;
                    maxSpotsInLine = 5;
                    lastFourInLine = 0;
                } else if (lastFourInLine === 4 && maxSpotsInLine !== 0) {
                    maxSpotsInLine--;
                } else if (maxSpotsInLine <= 2) {
                    lastFourInLine = 0;
                    maxSpotsInLine = 5;
                    currentLine++;
                } else {
                    maxSpotsInLine--;
                }
                console.log(field[i], 'current:', currentLine, 'max:', maxSpotsInLine, 'last:', lastFourInLine)

                if ((i === lastFourStartIdx || i === lastFourTwoIdx || i === lastFourThreeIdx || i === lastFourEndIdx) && currentLine === 10) {
                    seed10.push(field[i]);
                    registeredFour.push(field[i])
                    lastFourInLine++;
                } else if (currentLine === 10) {
                    seed10.push(field[i])
                } else if ((i === lastFourStartIdx || i === lastFourTwoIdx || i === lastFourThreeIdx || i === lastFourEndIdx) && currentLine === 11) {
                    seed11.push(field[i]);
                    registeredFour.push(field[i])
                    lastFourInLine++;
                } else if (currentLine === 11) {
                    seed11.push(field[i])
                } else if ((i === lastFourStartIdx || i === lastFourTwoIdx || i === lastFourThreeIdx || i === lastFourEndIdx) && currentLine === 12) {
                    seed12.push(field[i]);
                    registeredFour.push(field[i])
                    lastFourInLine++;
                } else if (currentLine === 12) {
                    seed12.push(field[i])
                } else if ((i === lastFourStartIdx || i === lastFourTwoIdx || i === lastFourThreeIdx || i === lastFourEndIdx) && currentLine === 13) {
                    seed13.push(field[i]);
                    registeredFour.push(field[i])
                    lastFourInLine++;
                } else if (currentLine === 13) {
                    seed13.push(field[i])
                } else if ((i === lastFourStartIdx || i === lastFourTwoIdx || i === lastFourThreeIdx || i === lastFourEndIdx) && currentLine === 14) {
                    seed14.push(field[i]);
                    registeredFour.push(field[i])
                    lastFourInLine++;
                } else if (currentLine === 14) {
                    seed14.push(field[i])
                }


            }

            return (
                <div>
                    <div>
                        <h3>No. 1 Seeds</h3>
                        {
                            seed1.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 2 Seeds</h3>
                        {
                            seed2.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 3 Seeds</h3>
                        {
                            seed3.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 4 Seeds</h3>
                        {
                            seed4.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 5 Seeds</h3>
                        {
                            seed5.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 6 Seeds</h3>
                        {
                            seed6.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 7 Seeds</h3>
                        {
                            seed7.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 8 Seeds</h3>
                        {
                            seed8.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 9 Seeds</h3>
                        {
                            seed9.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 10 Seeds</h3>
                        {
                            seed10.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 11 Seeds</h3>
                        {
                            seed11.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 12 Seeds</h3>
                        {
                            seed12.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 13 Seeds</h3>
                        {
                            seed13.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 14 Seeds</h3>
                        {
                            seed14.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 15 Seeds</h3>
                        {
                            seed15.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
                    </div>
                    <div>
                        <h3>No. 16 Seeds</h3>
                        {
                            seed16.map(team => {
                                return (
                                    <p className="new-bracket-team">{team}</p>
                                )
                            })
                        }
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
        newLastFour: state.userLastFours[state.userLastFours.length - 1]
    }
}

const mapDispatch = (dispatch) => {
    return {
        // dispatch(getBracket)
    }
}

export default withRouter(connect(mapState, mapDispatch)(NewBracket));