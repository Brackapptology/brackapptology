import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class BuildHelp extends Component {
  state = {
    open: true,
    value: 'a'
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, value: 'a' });
  };

  handleChange = (value) => {
    this.setState({
      value: value,
    });
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
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
          >
            <Tab label="How To" value="a">
              <div>
                <h2 style={styles.headline}>How This Works</h2>
                <ol>
                  <li>Compare teams by the resumes on their cards.</li>
                  <li>Use the arrows at the bottom of each card to move teams up and down.</li>
                  <li>Want to move a team more than just a few spots? Use the quick rank selector to save time.</li>
                  <li>Don't forget about the projected champions, who get automatic bids! Most of them are probably near the bottom.</li>
                  <li>Want to remove any potential biases that come with a team's name? Click "Go Blind" for a blind resume test.</li>
                  <li>Hit submit once you've completed your bracketology!</li>
                  <li>And if you need a reminder for any of the above, click "Help" in the bottom-right corner.</li>
                </ol>
              </div>
            </Tab>
            <Tab label="Quadrants?" value="b">
              <div>
                <h2 style={styles.headline}>What Are Quadrants?</h2>
                <p>
                  In the past, the NCAA Selection Committee evaluated a road win over, say,
              the No. 5 RPI team the same as a home win over the No. 45 team. Both wins
              appeared in the same "vs. RPI 1-50" column on a team's sheet. That was bad, and
              you can read why <a href="https://www.cbssports.com/college-basketball/news/how-the-ncaa-tournament-selection-committee-is-changing-how-it-judges-teams/" target="_blank" >here</a>.
            </p>
                <p>
                  So the committee has changed the way it breaks down wins. Here's how...
            </p>
                <ul>
                  <li>Quadrant 1: Home (1-30), Neutral (1-50), Road (1-75)</li>
                  <li>Quadrant 2: Home (31-75), Neutral (51-100), Road (76-135)</li>
                  <li>Quadrant 3: Home (76-160), Neutral (101-200), Road (136-240)</li>
                  <li>Quadrant 4: Home (161-351), Neutral (201-351), Road (241-351)</li>
                </ul>
              </div>
            </Tab>
          </Tabs>
        </Dialog>
      </div>
    );
  }
}
