import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { blueGrey500, indigo700, grey300 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
        primary2Color: indigo700,
        accent1Color: grey300,
        pickerHeaderColor: blueGrey500,
        alternateTextColor: grey300,
  }
});

// establishes socket connection
import './socket'

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>
  ,
  document.getElementById('app')
)
