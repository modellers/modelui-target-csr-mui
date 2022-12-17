// common tools
import { StateInstance } from './StateBase';
import { StateBaseComponent } from './StateBaseComponent';
// event handler
import EventManager from './Event';


export const events = {
  enabled: {
    alias: [],
    info: {
      name: 'Enabled',
      description: 'Enabled input'
    },
    schema: {}
  },
  disabled: {
    alias: [],
    info: {
      name: 'Disabled',
      description: 'Disabled input'
    },
    schema: {}
  },
  populating: {
    alias: [],
    info: {
      name: 'Populating',
      description: 'Populating value'
    },
    schema: {}
  },
  populated: {
    alias: [],
    info: {
      name: 'Populated',
      description: 'Populated value'
    },
    schema: {}
  },
  invalidated: { alias: [], info: { name: 'In-validated', description: 'Unselecting item' }, schema: {} },
  validated: { alias: [], info: { name: 'De-Selected', description: 'Unselecting item' }, schema: {} },

  /// here we have specific OMG
  changed: {
    alias: ['changed'],
    info: {
      name: 'changed',
      description: 'Diagram changed by user'
    },
    schema: {}
  },
  /*
  loading: {
    alias: ['opening', 'fetching', 'streaming'],
    info: {
      name: 'loading',
      description: 'Loading diagram'
    },
    schema: {}
  },
  loaded: {
    alias: ['opened', 'fetched', 'streamed'],
    info: {
      name: 'loaded',
      description: 'Loaded diagram'
    },
    schema: {}
  },
  */
  selected: {
    alias: [],
    info: {
      name: 'Selected',
      description: 'Selecting item'
    },
    schema: {}
  },
  tap: {
    alias: ['dblclick'],
    info: {
      name: 'Tap',
      description: 'Diagram element tapped'
    },
    schema: {}
  },
  'hover-over': {
    alias: [],
    info: {
      name: 'Hover over',
      description: 'Hover over element'
    },
    schema: {}
  },
  'hover-exit': {
    alias: [],
    info: {
      name: 'Hover exit',
      description: 'Hover exists element'
    },
    schema: {}
  },
  press: {
    alias: ['mouse-down'],
    info: {
      name: 'Press',
      description: 'Pressed element'
    },
    schema: {}
  },
  release: {
    alias: ['mouse-release'],
    info: {
      name: 'Release',
      description: 'Diagram element released'
    },
    schema: {}
  },
  cleared: {
    alias: ['removed', 'reset'],
    info: {
      name: 'cleared',
      description: 'Diagram area cleared'
    },
    schema: {}
  },
  submitted: {
    alias: ['exported', 'saved'],
    info: {
      name: 'submitted',
      description: 'Saved diagram'
    },
    schema: {}
  },
  failure: {
    alias: ['error', 'exception'],
    info: {
      name: 'failure',
      description: 'Error occured'
    },
    schema: {}
  }
}

export const triggers = {
  submit: { info: { name: 'Submit', description: 'Submits the form data' }, schema: {}, alias: [] },
  enable: { info: { name: 'Enables', description: 'Enables the form so that we can change form inputs' }, schema: {}, alias: [] },
  disable: { info: { name: 'Disable', description: 'Disables the form so that we can not change input value' }, schema: {}, alias: [] },
  // change: { info: { name: 'Change', description: 'Changes' }, schema: {}, alias: [] },
  select: { info: { name: 'Select', description: 'Selects item by id' }, schema: {}, alias: [] },
  clear: { info: { name: 'Clear', description: 'Removes all input values clearing the form' }, schema: {}, alias: [] },
  populate: { info: { name: 'Populate', description: 'Fillls the form with specified data' }, schema: {}, alias: [] },
};


export const options = {
  "id": "omg",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "OMG",
  "description": "OMG options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "disabled": {
      "title": "disabled",
      "description": "Is the view disabled",
      "type": "boolean",
      "default": false
    }
  },
  "required": ["disabled"]
}


export class StateOMG extends StateInstance {

  constructor(props) {
    super(props);
    this.props = props;
    // apply initial values
    this.state = { data: props.data, select: [], disabled: (props.config || {}).disabled || true };
  }

  registerComponent = (actionHandlers, eventHandlers, component_info) => {
    const self = this;
    actionHandlers = actionHandlers || {};
    eventHandlers = eventHandlers || {};

    // add our known handlers
    // register componenet overiding or adding new event handlers
    const dataActionHandlers = {
      submit: {
        schema: {},
        handler: (obj) => {
          EventManager.getInstance().addEvent(this.props.id, 'submitting', obj, null);
          this.getActionState('submit', function (change) {
            const update = self.alterState(change);
            EventManager.getInstance().addEvent(self.props.id, 'submitted', update.data, null);
          });
        }
      },
      enable: {
        schema: {},
        handler: (obj) => {
          const change = { disabled: false }
          EventManager.getInstance().addEvent(this.props.id, 'enabled', change, null);
          self.alterState(change);
          if (this.updateView("enable", obj, obj, this.state.data)) {
            EventManager.getInstance().addEvent(this.props.id, 'enabled', change, null);
          }
        }
      },
      disable: {
        schema: {},
        handler: (obj) => {
          const change = { disabled: true }
          self.alterState(change);
          if (this.updateView("disable", obj, obj, this.state.data)) {
            EventManager.getInstance().addEvent(this.props.id, 'disabled', change, null);
          }
        }
      },
      select: {
        schema: {},
        handler: (obj) => {
          const selected = obj.ids; // TODO: handle this generically 
          const change = { selected: selected }
          const update = self.alterState(change);
          EventManager.getInstance().addEvent(this.props.id, 'selecting', change, {});
          if (this.updateView("select", obj, change, update)) {
            EventManager.getInstance().addEvent(this.props.id, 'selected', update.selected, null);
          }
          EventManager.getInstance().addEvent(this.props.id, 'changed', update.selected, null);
        }
      },
      clear: {
        schema: {},
        handler: (obj) => {
          const change = { selected: [], data: { xml: "" } }
          const update = self.alterState(change);
          EventManager.getInstance().addEvent(this.props.id, 'clearing', update, {});
          if (this.updateView("clear", obj, change, update)) {
            EventManager.getInstance().addEvent(this.props.id, 'cleared', update.data, null);
          }
          EventManager.getInstance().addEvent(this.props.id, 'changed', update.data, null);
        }
      },
      populate: {
        schema: {},
        handler: (obj) => {
          const change = { data: obj }
          EventManager.getInstance().addEvent(this.props.id, 'populating', change.data, null);
          const update = self.alterState(change);
          if (this.updateView("populate", obj, update, update.data)) {
            EventManager.getInstance().addEvent(this.props.id, 'populated', update.data, null);
          }
          EventManager.getInstance().addEvent(this.props.id, 'changed', update.data, null);
        }
      }
    }

    // register componenet overiding or adding new event handlers
    this.ddEvent = EventManager.getInstance().register(this.props.id, { ...dataActionHandlers, ...actionHandlers }, { ...events, ...eventHandlers }, component_info);
    return this.ddEvent;
  }
}

export class OMGBase extends StateBaseComponent {
  /**
   * Used to manage internal state of avatars
   */
  constructor(props) {
    if (!props.config.options) { props.config.options = {} }
    super(props);
    this.props = props;
  }

  updateView = (action, arr, updated, data) => {
    // extend by parent
    return true;
  }

  exceptionCatched = (action_name, event_object) => {
    debugger;
    console.info("OMG: " + action_name + " --> ", event_object)
  }
  /*  
    getData = () => {
      return this.state.data;
    }
  
    showSelected = (id, idx) => {
      // parent implementation to update the visual representation
      return true; // returns true to update state. Else do not update state.
    }
  
    setSelectedId = (id, evt, selected) => {
      EventManager.getInstance().addAction(this.props.id, 'select', { id: id });
    }
  
    handleSelect = (key, data, index, evt) => {
  
      if (!evt) { this.setSelectedId(data.id, evt); }
  
    }
    */

  render() { return null; }
}