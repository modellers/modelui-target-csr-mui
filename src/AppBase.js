import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import { Layout } from './components/Grid/Grid';
import { Dialog } from './components/Modal/Modal';
import { getTransformFunction } from './event/Event';
import { layout } from 'modelui-core-runtime';

import registerComponents from './components/Components';
import registerPluginComponents from './components/Plugins';
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
    this._component_manager = layout.Manager.ComponentManager.getInstance(); // ComponentManager.getInstance();
    this._event_manager = this._component_manager.getEventManager()
    this._state_manager = this._component_manager.getStateManager()
    registerComponents(this._component_manager);
    registerPluginComponents(this._component_manager);

    // clear all
    this._event_manager.clearAll();

    // add specific solutions
    registerEventDebugging();
    registerEventApp();

  }

  initDataSources = (state) => {

    state = state || this.state;
    // register static memory
    this._state_manager.clearAll();
    this._state_manager.createState({
      id: "document_root",
      type: "layout",
      schema: {},
      config: {},
      data: state.view
    })
    /*
    this._state_manager.createState({
      id: "app",
      type: "app",
      schema: {},
      config: {},
      data: {}
    })
    */
    // register the view and then the modals
    this._state_manager.createLayoutState(state.view);
    this._state_manager.createLayoutState(state.modal);
    // register components for memory database
    this._state_manager.createStates(state.sources);
    // set dealy since we need to register all the component first
    // this is for being able to apply filtering on registered components
    state.events.forEach(evt => {
      if (typeof (evt.transform) !== 'function') {
        evt.transform = getTransformFunction(evt);
      }
    })
    this._event_manager.watch(state.events);

  }

  componentDidMount = () => {
    // notify ready event
    this._event_manager.addEvent('app', 'ready', {}, {});
    window.eventManager = this._event_manager;
    this.renderReady();
  }

  renderBody = () => {

    const is_ready = true;
    const manager = this._component_manager;

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
