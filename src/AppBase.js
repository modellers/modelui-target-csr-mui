import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import { Layout } from './components/Grid/Grid';
import { Dialog } from './components/Modal/Modal';
import EventManager, { getTransformFunction } from './event/Event';
import { StateManager } from './event/StateManager';
import ComponentManager from './components/Layout/Manager';

import registerComponents from './components/Components';
import { registerEventDebugging, registerEventApp } from './event/CommonEvents';

import { ThemeProvider } from '@mui/material/styles';

class AppBase extends React.Component {

  state = {
    modal: [],
    view: [],
    data: [],
    sources: [],
    events: [],
    transform: {}
  };

  data_sources = {};

  constructor(props) {
    super(props);
    // register components
    registerComponents();

    // clear all
    EventManager.getInstance().clearAll();

    // add specific solutions
    registerEventDebugging();
    registerEventApp();

  }

  initDataSources = (state) => {

    state = state || this.state;
    // register static memory
    StateManager.getInstance().clearAll();
    StateManager.getInstance().createState({
      id: "document_root",
      type: "layout",
      schema: {},
      config: {},
      data: this.state.view
    })
    /*
    StateManager.getInstance().createState({
      id: "app",
      type: "app",
      schema: {},
      config: {},
      data: {}
    })
    */
    // register the view and then the modals
    StateManager.getInstance().createLayoutState(state.view);
    StateManager.getInstance().createLayoutState(state.modal);
    // register components for memory database
    StateManager.getInstance().createStates(state.sources);
    // set dealy since we need to register all the component first
    // this is for being able to apply filtering on registered components
    state.events.forEach(evt => {
      if (typeof (evt.transform) !== 'function') {
        evt.transform = getTransformFunction(evt);
      }
    })
    EventManager.getInstance().watch(state.events);

  }

  componentDidMount = () => {
    // notify ready event
    EventManager.getInstance().addEvent('app', 'ready', {}, {});
    window.eventManager = EventManager.getInstance();
    this.renderReady();
  }

  renderBody = () => {

    const is_ready = true;
    const manager = ComponentManager.getInstance();

    if (is_ready) {
      return (
        <div>
          <Layout
            id="document_root"
            schema={{}}
            config={{
            }}
            data={this.state.view}
            manager={manager}
          />
          {
            this.state.modal.map((itm, idx) => (
              <Dialog
                key={itm.id}
                id={itm.id}
                data={itm.data}
                config={itm.config}
                schema={itm.schema}
                manager={manager}
              />
            ))
          }</div>)

    } else {
      return (<div> LOADING ... </div>)
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <div>
            {this.renderBody()}
          </div>
        </div >
      </ThemeProvider>
    );
  }
}

export default AppBase;
