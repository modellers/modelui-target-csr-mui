// react basics
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// libraries
import axios from 'axios';  // fetching json

// eventfull core
import AppBase from './AppBase';


class App extends AppBase {

  state = {
    modal: [],
    view: [],
    data: [],
    sources: [],
    events: [],
    transform: {}
  };

  state = { "modal": [], "view": [{ "schema": {}, "data": [{ "content": { "id": "16c7dc9cf1b8239084221605776f2633ce6dec64", "data": [], "type": "calendar-big", "schema": {}, "config": { "options": { "views": "work_week", "selectable": true, "config": "month" } } }, "disabled": false, "icon": "", "title": "Calendar", "id": "3c225c434ded021940ce2e5226f8021506b981e0" }, { "content": { "config": { "options": { "color": "primary", "size": "medium", "buttonVariant": "contained" } }, "schema": {}, "type": "buttons", "id": "53f3305e201830f18e7fb081913b77aa990f39af", "data": [{ "icon": "font-awesome:fa fa-heart-o", "title": "Button", "id": "d1673ca0a37318591b4f2fb738c8e6914e61857a", "disabled": false }] }, "icon": "", "title": "Button", "id": "67477e9ddd0b92b3736c81abaf3aef1b82e1877f", "disabled": false }, { "title": "Table", "content": { "id": "287c980e0d91f2c6966099435c3195efdf28a875", "type": "table", "schema": { "$id": "https://example.com/schema.json", "title": "Person List", "$schema": "https://json-schema.org/draft/2020-12/schema", "required": ["id"], "type": "object", "properties": { "age": { "description": "Age of persion", "type": "number", "title": "Age" }, "id": { "title": "Identifier", "description": "Required identifier", "type": "string" }, "name": { "title": "Name", "description": "Name of persion", "type": "string" } } }, "config": { "options": { "select": false, "size": "medium", "_$data": "ee4b54935f88" } }, "data": { "items": [{ "id": "akil", "name": "Akil", "age": "46" }, { "id": "amira", "age": "9", "name": "Amíra" }], "schema": { "$schema": "https://json-schema.org/draft/2020-12/schema", "title": "Person List", "properties": { "age": { "title": "Age", "type": "number", "description": "Age of persion" }, "name": { "title": "Name", "description": "Name of persion", "type": "string" }, "id": { "type": "string", "description": "Required identifier", "title": "Identifier" } }, "type": "object", "required": ["id"], "$id": "https://example.com/schema.json" } } }, "disabled": false, "icon": "", "id": "b5d2d7da11fb4c6f462c0523265e288c14699851" }], "type": "tabs", "config": { "options": { "indicatorColor": "secondary", "contentMargin": 1, "tabVariant": "standard", "textColor": "inherit" } }, "id": "c8e22aeddb01a0150f5ccd44369a913b01ce8735" }], "data": [], "sources": [], "events": [{ "transform": "i=3;\\ni++;asdfasdf \\n12/2\\nreturn data; // SEL always return something unless raising exceptions\\n", "trigger": { "id": "53f3305e201830f18e7fb081913b77aa990f39af", "action": "select" }, "component": { "id": "16c7dc9cf1b8239084221605776f2633ce6dec64", "event": "replacing" } }, { "trigger": { "id": "16c7dc9cf1b8239084221605776f2633ce6dec64", "action": "delete" }, "transform": "return data; // asdfsfptions DEL", "component": { "id": "53f3305e201830f18e7fb081913b77aa990f39af", "event": "deleted" } }], "transform": {}, "updated": "2022-12-30T09:53:32.483Z" }

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



