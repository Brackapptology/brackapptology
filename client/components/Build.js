import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import SubmitBracket from './SubmitBracket';
import BuildHelp from './BuildHelp'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { white, black } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import axios from 'axios';

class Build extends Component {

  constructor() {
    super();
    this.state = {
      teams: {},
      field: [],
      submitted: false,
      blind: false,
      displayAdvanced: false,
      height: 'tall'
    }
    this.populateTeamCards = this.populateTeamCards.bind(this)
  }

  componentDidMount() {
    return axios.get('/api/data')
      .then(res => this.setState({ field: res.data.data }))
      .catch(console.error)
  }

  toggleMetricView() {
    let height = '';
    this.state.height === 'tall' ? height = 'small' : height = 'tall';
    this.setState({ displayAdvanced: !this.state.displayAdvanced, height })
  }

  populateTeamCards() {

    const field = this.state.field;

    let metrics = '';

    this.state.displayAdvanced ? metrics = 'Traditional Stats' : metrics = 'Advanced Metrics'

    return field.map((teamObj, idx) => {
      return (
        <div key={idx} className={`team-card team-card-${this.state.height}`}>
          {
            !this.state.blind
              ?
              <div>
                <h3 className="team-card-name">{idx + 1 + '. ' + teamObj.team}</h3>
                {
                  teamObj.isChamp === true
                    ?
                    <h5 className="team-card-small-header">{teamObj.conf} <small>Proj. Champ</small></h5>
                    :
                    <h5 className="team-card-small-header">{teamObj.conf}</h5>
                }
              </div>
              :
              <h3>No. {idx + 1}</h3>
          }
          {
            this.state.displayAdvanced
              ?
              <div>
                <RaisedButton label={`${metrics}`} onClick={this.toggleMetricView.bind(this)} />
                <p>BPI: {teamObj.bpi}</p>
                <p>BPI SOS: {teamObj.sos}</p>
                <p>BPI SOR: {teamObj.sor}</p>
                <p>KPI: {teamObj.kpi}</p>
                <p>KPI SOS: {teamObj.kpiSOS}</p>
                <p>vs. KPI Top 50: {teamObj.top50}</p>
              </div>
              :
              <div>
                <RaisedButton label={`${metrics}`} onClick={this.toggleMetricView.bind(this)} />
                <p>Record: {teamObj.record}</p>
                <p>Home: {teamObj.home}</p>
                <p>Away/Neutral: {teamObj.awayNeutral}</p>
                <p>RPI: {teamObj.rpi}</p>
                <p>vs. Quadrant 1: {teamObj.group1}</p>
                <p>vs. Quadrant 2: {teamObj.group2}</p>
                <p>vs. Quadrant 3: {teamObj.group3}</p>
                <p>vs. Quadrant 4: {teamObj.group4}</p>
              </div>

          }
          {
            idx > 0
              ?
              <ArrowUp onClick={this.moveTeam.bind(this, idx, true)} />
              :
              null
          }
          {
            idx < field.length - 1
              ?
              <ArrowDown onClick={this.moveTeam.bind(this, idx, false)} />
              :
              null
          }
          <div className="quick-rank">
            <SelectField
              floatingLabelText="Quick-Rank"
              floatingLabelStyle={{ textColor: black }}
              style={{ width: 120, textColor: white }}
            >
              {
                this.state.field.map((rank, selectIdx) => {
                  return <MenuItem key={selectIdx} value={selectIdx} primaryText={selectIdx + 1} onClick={this.quickRank.bind(this, teamObj, selectIdx)} />
                })
              }

            </SelectField>
          </div>
        </div>
      )
    })
  }

  quickRank(teamObj, selectIdx) {
    let teams = this.state.field;
    let oldIdx = teams.indexOf(teamObj);
    let newIdx = selectIdx;
    if (oldIdx > newIdx) {
      teams.splice(newIdx, 0, teamObj)
      teams.splice(oldIdx + 1, 1)
    } else if (newIdx > oldIdx) {
      teams.splice(newIdx + 1, 0, teamObj)
      teams.splice(oldIdx, 1)
    }
    this.setState({ field: teams });
  }

  moveTeam(idx, bool) {
    let teams = this.state.field;
    let focus = teams[idx];
    let moveDown = teams[idx - 1];
    let moveUp = teams[idx + 1];
    let tempA = focus;
    let tempB = moveDown;
    let tempC = moveUp;

    if (bool) {
      teams[idx] = moveDown;
      teams[idx - 1] = tempA;
    } else {
      teams[idx] = tempC;
      teams[idx + 1] = focus;
    }

    this.setState({ field: teams })
  }


  toggleBlind() {
    this.setState({ blind: !this.state.blind })
  }

  render() {
    if (this.state.field) {
    return (
      <div id="build-page">
        <div id="blind-button">
          {
            this.state.blind
              ?
              <RaisedButton label="Leave Blind Mode" onClick={this.toggleBlind.bind(this)} />
              :
              <RaisedButton label="Go Blind" onClick={this.toggleBlind.bind(this)} />
          }
        </div>
        <div id="build-buttons">
          <div id="submit-bracket">
            <SubmitBracket
            field={this.state.field}
            id={this.props.id}
            />
          </div>
          <BuildHelp />
        </div>
        <div id="field">
          {
            this.populateTeamCards()
          }
        </div>
      </div>
    )
  } else {
    return null
  }
  }
}

const mapState = (state) => {
  return {
    userId: !!state.activeUser.id,
    id: state.activeUser.id
  }
}

export default withRouter(connect(mapState)(Build));
