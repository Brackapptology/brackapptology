import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class BuildHelp extends Component {
    state = {
      open: false,
    };
  
    handleOpen = () => {
      this.setState({open: true});
    };
  
    handleClose = () => {
      this.setState({open: false});
    };
  
    render() {
      const actions = [
        <FlatButton
          label="Got it"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleClose}
        />,
      ];
  
      return (
        <div>
          <RaisedButton label="Help" onClick={this.handleOpen} />
          <Dialog
            title="Need help?"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <ol>
                <li>Compare teams by resumes on team cards.</li>
                <li>Use arrows at bottom of card to move teams up and down.</li>
                <li>Want to move a team more than just a few spots? Use the quick rank selector to save time.</li>
                <li>Don't forget about the projected champions, who get automatic bids! Most of them are probably near the bottom</li>
                <li>Hit submit once you've completed your bracketology!</li>
            </ol>
          </Dialog>
        </div>
      );
    }
  }
  