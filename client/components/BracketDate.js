import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
    customWidth: {
        width: 150,
    },
};

export default class SelectFieldExampleSimple extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1,
        };
    }

    handleChange = (event, index, value) => this.setState({ value });

    render() {
        return (
            <div>
                <SelectField
                    floatingLabelText="Frequency"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                {
                    this.props.brackets.map((entry, idx) => {
                        return (
                            <MenuItem key={idx} value={idx + 1} primaryText={entry.date} />
                        )
                    })
                }
                </SelectField>
            </div>
        )
    }
}