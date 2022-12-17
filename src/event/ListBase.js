// common tools
import { StateInstance } from './StateBase';
import { StateBaseComponent } from './StateBaseComponent';
import { findItemIndexById, removeItemIndexByIndex, mergeDeep } from '../util/ObjUtil';
// event handler
import EventManager from './Event';

const schema_only_id = {
  // "$schema": "http://json-schema.org/draft-06/schema#",
  "$id": "v1/listbase/..",
  "type": "array",
  "items": {
    "$ref": "#/definitions/identifier"
  },
  "definitions": {
    "identifier": {
      "type": "object",
      "additionalProperties": true,
      "properties": {
        "id": {
          "type": "string"
        }
      },
      "required": ["id"],
      "title": "Identifier with additional properties"
    }
  }
}

export const triggers = {
  submit: {
    alias: [],
    info: {
      name: 'Submit',
      description: 'Submit entire list'
    },
    schema: {}
  },
  replace: {
    alias: [],
    info: {
      name: 'Replace',
      description: 'Replace data'
    },
    schema: {}
  },
  push: {
    alias: [],
    info: {
      name: 'Push',
      description: 'Adds data at the end to component'
    },
    schema: {}
  },
  push_front: {
    alias: [],
    info: {
      name: 'Push front',
      description: 'Adds data to the front of the component'
    },
    schema: {}
  },
  delete: {
    alias: [],
    info: {
      name: 'Delete data instance',
      description: 'Removes data from the component'
    },
    schema: { ...schema_only_id, '$id': 'v1/listbase/delete' }
  },
  pop: {
    alias: [],
    info: {
      name: 'Pop back item',
      description: 'Deletes / removes back data item'
    },
    schema: {}
  },
  pop_front: {
    alias: [],
    info: {
      name: 'Pop front item',
      description: 'Deletes / removes front data item'
    },
    schema: {}
  },
  select: {
    alias: [],
    info: {
      name: 'Select item',
      description: 'Selects the data item'
    },
    schema: { ...schema_only_id, '$id': 'v1/listbase/select' }
  },
  clear: {
    alias: [],
    info: {
      name: 'Clear items',
      description: 'Removes all items from list'
    },
    schema: {}
  }
}

export const events = {

  changed: {
    alias: [],
    info: {
      name: 'changed',
      description: 'Changed size'
    },
    schema: {}
  },
  replacing: {
    alias: [],
    info: {
      name: 'replacing',
      description: 'Replacing content'
    },
    schema: {}
  },
  replaced: {
    alias: [],
    info: {
      name: 'replaced',
      description: 'Replace content'
    },
    schema: {}
  },
  submitted: {
    alias: [],
    info: {
      name: 'Submitted',
      description: 'Subbited all items in list'
    },
    schema: {}
  },
  deleted: {
    alias: [],
    info: {
      name: 'Deleted',
      description: 'Deleted specified items'
    },
    schema: {}
  },
  pushing: {
    alias: [],
    info: {
      name: 'Pusing',
      description: 'Pushing item in front of list'
    },
    schema: {}
  },
  pushed: {
    alias: [],
    info: {
      name: 'Pushed',
      description: 'Pushed item in front of list'
    },
    schema: {}
  },
  selected: {
    alias: [],
    info: {
      name: 'Selected',
      description: 'Selecting item'
    },
    schema: { ...schema_only_id, '$id': 'v1/listbase/selected' }
  },
  deselected: {
    alias: [],
    info: {
      name: 'De-Selected',
      description: 'Unselecting item'
    },
    schema: {}
  },
  clearing: {
    alias: [],
    info: {
      name: 'Clearing',
      description: 'Removing all items'
    },
    schema: {}
  },
  cleared: {
    alias: [],
    info: {
      name: 'Cleared',
      description: 'Removed all items'
    },
    schema: {}
  }
}


export class StateList extends StateInstance {

  constructor(props) {
    super(props);
    this.props = props;
    // ensure array
    let _data = [];
    if (props.data) {
      if (Array.isArray(props.data)) {
        _data = props.data;
      } else {
        // check if this is an empty object
        if (typeof (props.data) == 'object') {
          // objects should not be empty
          if (props.data.length) { _data = [props.data]; }
        } else {
          _data = [props.data];
        }
      }
    }
    // apply default values
    this.state = { data: _data || [], selectedIndex: 0, selectedId: null };
  }

  findItemIndexById = (id, data) => { return findItemIndexById(id, data); }

  updateItem = (id, props) => {
    const idx = this.findItemIndexById(id, this.state.data);
    const updated = [...this.state.data]; // copy
    // TODO: validate props against schema
    if (idx >= 0) {
      for (const [key, value] of Object.entries(props)) {
        updated[idx][key] = value;
      }
      this.setState({ ...this.state, data: updated });

    }
  }

  registerComponent = (actionHandlers, eventHandlers, component_info) => {
    actionHandlers = actionHandlers || {};
    eventHandlers = eventHandlers || {};
    // add our known handlers
    const dataActionHandlers = {
      submit: {
        schema: {},
        handler: (objs) => { // submit
          EventManager.getInstance().addEvent(this.props.id, 'submitted', { count: this.state.data.length, items: this.state.data }, {});
        }
      },
      replace: {
        schema: {},
        handler: (objs) => { // append
          const data_state = this.state.data || [];
          // want an array
          if (!Array.isArray(objs)) { objs = [objs]; }
          EventManager.getInstance().addEvent(this.props.id, 'replacing', { count: data_state.length, old: data_state, new: objs }, {});
          let data = objs;
          if (this.updateView("replace", [], [], data)) {
            this.setState({ ...this.state, data: data });
          }
          EventManager.getInstance().addEvent(this.props.id, 'replaced', { count: data.length, items: data }, {});
          EventManager.getInstance().addEvent(this.props.id, 'changed', { count: data.length, items: data }, {});
        }
      },
      push: {
        schema: {},
        handler: (objs) => { // append
          const data_added = [];
          const data_updated = []; // contains ids
          const data_state = this.state.data || [];
          let selected = {};
          // want an array
          if (!Array.isArray(objs)) { objs = [objs]; }
          objs.forEach(obj => {
            const idx = this.findItemIndexById(obj.id, data_state);
            if (idx === null) {
              data_added.push(obj);
            } else { // update the index
              data_state[idx] = mergeDeep(data_state[idx], obj); // TODO: fetch from utils
              data_updated.push(idx);
            }
            if (obj.selected) { // TODO: test that we can push items that are selected
              selected = { selectedId: obj.id, selectedIndex: idx };
            }
          });
          let data = [...data_state, ...data_added];
          // notify parent class of push event
          try {
            EventManager.getInstance().addEvent(this.props.id, 'pushing', data_added, {});
            if (this.updateView("push", data_added, data_updated, data)) {
              this.setState({ ...this.state, ...selected, data: data, });
            }
          } catch (e) {
            this.exceptionCatched("push", e);
          }
          EventManager.getInstance().addEvent(this.props.id, 'pushed', { count: data.length, items: data, added: data_added }, {});
          EventManager.getInstance().addEvent(this.props.id, 'changed', { count: data.length, items: data, added: data_added, updated: data_updated }, {});
          // FIXME: this.showSelected(selected.selectedId, selected.selectedIndex || -1);
        }
      },
      push_front: {
        schema: {},
        handler: (objs) => {
          const data_added = [];
          const data_updated = [];
          const data_state = this.state.data || [];
          let selected = {};
          // want an array
          if (!Array.isArray(objs)) { objs = [objs]; }
          objs.forEach(obj => {
            const idx = this.findItemIndexById(obj.id, this.state.data);
            if (idx === null) {
              data_added.push(obj);
            } else { // update the index
              data_state[idx] = obj;
              data_updated.push(idx);
            }
            if (obj.selected) { // TODO: test that we can push items that are selected
              selected = { selectedId: obj.id, selectedIndex: idx || data_added.length - 1 };
            }

          });
          let data = [...data_added, ...data_state];
          if (this.updateView("push_front", [], data_updated, data)) {
            this.setState({ ...this.state, ...selected, data: data });
          }
          EventManager.getInstance().addEvent(this.props.id, 'changed', { count: data.length, items: data }, {});
          // FIXME: this.showSelected(selected.selectedId, selected.selectedIndex || -1);
        }
      },
      delete: {
        schema: {},
        handler: (objs) => {
          // want an array
          if (!Array.isArray(objs)) { objs = [objs]; }
          let data = this.state.data;
          const data_updated = [];
          const deleting = [];
          objs.forEach(obj => {
            if (obj.id) {
              // requires array
              let idx = this.findItemIndexById(obj.id, data);
              if (idx !== null) {
                deleting.push(obj.id);
                data = removeItemIndexByIndex(idx, data)
                data_updated.push(idx);
              }
            }
          });
          try {
            if (this.updateView("delete", [], data_updated, data)) {
              this.setState({ ...this.state, data: data });
            }
          } catch (e) {
            this.exceptionCatched("delete", e);
          }

          EventManager.getInstance().addEvent(this.props.id, 'changed', { count: data.length, items: data, deleted: deleting }, {});
          EventManager.getInstance().addEvent(this.props.id, 'deleted', { count: deleting.length, items: data, deleted: deleting }, {});
        }
      },
      pop: {
        schema: {},
        handler: (obj) => {
          if (this.state.data.length > 0) {
            this.state.data.splice(this.state.data.length - 1, 1)
            if (this.updateView("pop", [], [], this.state.data)) {
              this.setState({ ...this.state, data: this.state.data });
              EventManager.getInstance().addEvent(this.props.id, 'changed', { count: this.state.data.length, items: this.state.data }, {});
            }
          }
        }
      },
      pop_front: {
        schema: {},
        handler: (obj) => {
          this.state.data.splice(0, 1);
          if (this.updateView("pop_front", [], [], this.state.data)) {
            this.setState({ ...this.state, data: this.state.data });
            EventManager.getInstance().addEvent(this.props.id, 'changed', { count: this.state.data.length, items: this.state.data }, {});
          }
        }
      },
      select: {
        schema: {},
        handler: (objs) => {
          const data_updated = [];
          const selected = [];
          // want an array
          if (!Array.isArray(objs)) { objs = [objs]; }
          // allow only one selection
          if (true) {
            for (let i = 0; i < this.state.data.length; i++) {
              this.state.data[i].selected = false;
            }
          }
          // find selected
          objs.forEach(obj => {
            if (obj.id) {
              // requires array
              let idx = this.findItemIndexById(obj.id, this.state.data);
              if (idx !== null) {
                this.state.data[idx].selected = !this.state.data[idx].selected;
                this.state.selectedId = this.state.data[idx].id;
                this.state.selectedIndex = idx;
                data_updated.push(idx);
                selected.push(this.state.data[idx]);
              }
            }
          });
          // for now we just replace the state
          this.setState({ ...this.state, data: this.state.data })
          EventManager.getInstance().addEvent(this.props.id, 'selecting', objs, null);
          if (this.updateView("select", objs, data_updated, this.state)) {
            EventManager.getInstance().addEvent(this.props.id, 'selected', selected, null);
          }

        }
      },
      clear: {
        schema: {},
        handler: (obj) => {
          EventManager.getInstance().addEvent(this.props.id, 'clearing', { count: this.state.data.length, items: this.state.data }, {});
          this.setState({ ...this.state, data: [] });
          EventManager.getInstance().addEvent(this.props.id, 'cleared', { count: this.state.data.length, items: this.state.data }, {});
          EventManager.getInstance().addEvent(this.props.id, 'changed', { count: this.state.data.length, items: this.state.data }, {});
          this.updateView("clear", [], [], []);
        }
      }
    }

    // register componenet overiding or adding new event handlers
    this.ddEvent = EventManager.getInstance().register(this.props.id, { ...dataActionHandlers, ...actionHandlers }, { ...events, ...eventHandlers }, component_info);
    return this.ddEvent;
  }


}

export class ListBase extends StateBaseComponent {
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
    console.info("ListBase: " + action_name + " --> ", event_object)
  }

  findItemIndexById = (id, data) => {
    if (this.stateManager) {
      return this.stateManager.findItemIndexById(id, data);
    }
  }

  updateItem = (id, props, silent) => {
    if (silent) {
      return this.updateItemSilent(id, props);
    } else {
      return this.triggerAction("push", { ...props, id: id })
    }
  }

  updateItemSilent = (id, props) => {
    if (this.stateManager) {
      return this.stateManager.updateItem(id, props);
    }
  }

  getData = () => {
    return this.state.data;
  }


  showSelectedRow = (row) => {
    if (this.props.config.options.select) {
      return row.selected
    }
    return false;
  }

  showSelected = (id, idx) => {
    // parent implementation to update the visual representation
    return true; // returns true to update state. Else do not update state.
  }

  setSelectedId = (id, evt, selected) => {
    // EventManager.getInstance().addAction(this.props.id, 'select', { id: id });
    this.triggerAction('select', { id: id })
  }

  getSelectedId = () => {
    const selected = [];
    this.state.data.forEach(itm => {
      if (itm.selected) {
        selected.push(itm.id);
      }
    });
    return selected;
  }

  getItemTreeState = () => {
    const selected = [];
    const expanded = [];
    this.state.data.forEach(itm => {
      if (itm.selected) {
        selected.push(itm.id);
      }
      if (itm.expanded) {
        expanded.push(itm.id);
      }
    });
    return { selected: selected, expanded: expanded, focused: this.state.selectedId };
  }

  handleSelect = (key, data, index, evt) => {

    if (!evt) { this.setSelectedId(data.id, evt); }

  }

  render() { return null; }
}
