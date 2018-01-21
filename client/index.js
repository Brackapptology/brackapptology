import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './routes'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey600, grey200, grey300 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey600,
        primary2Color: grey200,
        accent1Color: grey300,
        pickerHeaderColor: grey600,
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
