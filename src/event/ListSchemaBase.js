// common tools
import { StateList, triggers as triggersList, events as eventsList, } from './ListBase';
import { StateBaseComponent } from './StateBaseComponent';
import { findItemIndexById, removeItemIndexByIndex, mergeDeep } from '../util/ObjUtil';
// event handler
import EventManager from './Event';


export const triggers = triggersList;
export const events = eventsList;

const schema_with_ids = {
  "$id": "identifiers",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Identifiers",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    }
  },
  "required": ["id"],
}
export class StateSchemaList extends StateList {

  constructor(props) {
    super(props);
    this.props = props;
    // ensure array
    let _data = [];
    let _schema = props.data.schema || this.props.schema || schema_with_ids; // expect ids
    if (props.data) {
      // make sure we have at least a data property
      if (!props.data.items) { throw "Expecting data property in data object" }
      if (Array.isArray(props.data.items)) {
        _data = props.data.items;
      } else {
        // check if this is an empty object
        if (typeof (props.data.items) == 'object') {
          // objects should not be empty
          if (props.data.items.length) { _data = [props.data.items]; }
        } else {
          _data = [props.data.items];
        }
      }
    }
    // apply default values
    this.state = { schema: _schema, data: _data || [], selectedIndex: 0, selectedId: null };
  }

  findItemIndexById = (id, data) => { return findItemIndexById(id, data); }

  registerComponent = (actionHandlers, eventHandlers, component_info) => {
    actionHandlers = actionHandlers || {};
    eventHandlers = eventHandlers || {};
    // add our known handlers
    const dataActionHandlers = {
      submit: {
        schema: {},
        handler: (objs) => { // submit
          EventManager.getInstance().addEvent(this.props.id, 'submitted', { count: this.state.data.length, items: this.state.data, schema: this.state.schema }, {});
        }
      },
      replace: { // is the only way to change the schema
        schema: {},
        handler: (objs) => { // replace content

          // make sure we get items and / or schema properties
          const data_state = this.state;
          if (objs.schema) { } // TODO: validate schema
          if (objs.items) {
            if (!Array.isArray(objs.items)) { objs.items = [objs.items]; }
            // TODO: validate data (new or old) against new schema
          };

          EventManager.getInstance().addEvent(this.props.id, 'replacing', { old: data_state, new: objs }, {});
          let data = objs;
          if (this.updateView("replace", [], [], data.items)) {
            this.setState({ ...this.state, data: data.items || this.state.data, schema: data.schema || this.state.schema });
          }
          EventManager.getInstance().addEvent(this.props.id, 'replaced', { count: this.state.data.length, items: this.state.data, schema: this.state.schema }, {});
          EventManager.getInstance().addEvent(this.props.id, 'changed', { count: this.state.data.length, items: this.state.data, schema: this.state.schema }, {});
        }
      },
      push: {
        schema: {},
        handler: (objs) => { // append
          const data_added = [];
          const data_updated = []; // contains ids
          const data_state = [... (this.state.data || [])]; // FIXME: use better way
          let selected = {};
          // want an array
          if (!Array.isArray(objs)) { objs = [objs]; }
          objs.forEach(obj => {
            const idx = this.findItemIndexById(obj.id, data_state);
            if (idx === null) {
              data_added.push(obj);
            } else { // update the index
              data_state[idx] = mergeDeep(data_state[idx], obj);
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
          const data_state = [... (this.state.data || [])]; // FIXME: use better way
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

export class ListSchemaBase extends StateBaseComponent {
  /**
   * Used to manage internal state of avatars
   */
  constructor(props) {
    if (!props.config.options) { props.config.options = {} }
    super(props);
    this.props = props;
  }

  updateData = (change, object_id, silent) => {
    if (silent) { }
    // debugger;
    //const change_row_idx = this.findItemIndexById(object_id.id, this.state.data);
    // console.info(change_row_idx);
    // do the update 
    this.triggerAction('push', [change]);
    // this.state.data[change_row_idx] = mergeDeep (this.state.data[change_row_idx], change)
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

  handleSelect = (key, data, index, evt) => {

    if (!evt) { this.setSelectedId(data.id, evt); }

  }

  render() { return null; }
}
