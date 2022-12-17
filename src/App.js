// react basics
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// libraries
import axios from 'axios';  // fetching json

// eventfull core
import AppBase from './AppBase';

// firebase -------- start
import { config_firebase } from './config';
import firebase from 'firebase/app';
// Instantiate a Firebase app.
export const firebaseApp = firebase.initializeApp(config_firebase);
// DOES NOT WORK firebase.analytics();
// firebase -------- stop

class App extends AppBase {

  state = {
    modal: [],
    view: [],
    data: [],
    sources: [],
    events: [],
    transform: {}
  };

  server_deployment_preview = "http://localhost:4001/ui-modeller/us-central1/target_environment";

  constructor(props) {
    super(props);
    this.initDataSources(this.state);

    if (window) {
      window._app = this;
    }
  }

  onKeyUp(keyName, e, handle) {
    console.log("Updating design ... ");
    this.updateFromServer()
  }

  updateFromServer = () => {
    axios.get(this.server_deployment_preview)
      .then(result => {
        const data = result.data;
        if (result.status === 200) {

          console.info("Re-rendering ... ")
          const state = {
            ...this.state,
            ...{
              modal: data.modals,
              view: data.views,
              events: data.events,
              sources: data.sources,
              updated: new Date()
            }
          };
          this.initDataSources(state);
          this.setState(state);

        } else {
          console.info("Re-rendering ... FAILED ")
        }
      })
      .catch(function (error) {
        console.info("Re-rendering ... Exception: " + error)
      })
  }

  renderReady() {
    this.updateFromServer();
  }

  render() {

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          {this.renderBody()}
        </div >
      </ThemeProvider>
    );
  }

}


export default App;



