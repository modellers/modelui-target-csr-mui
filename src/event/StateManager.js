
import ComponentManager from '../components/Layout/Manager';
export class StateManager {

  static _instance = null;

  _states = {};

  /**
   * @returns {StateManager}
   */
  static getInstance() {
    if (StateManager._instance === null) {
      StateManager._instance = new StateManager();
    }

    return this._instance;
  }

  getManager(state_id) {
    return this._states[state_id];
  }

  clearAll() {

  }

  createState(props) {
    return this.createManager(props.id, props)
  }

  createStates(props_array) {
    for (let props of props_array) {
      this.createManager(props.id, props)
    }
  }

  createManager(state_id, props) {
    const _component = ComponentManager.getInstance().getComponent(props.type)
    if (_component) {
      const config = _component.config;
      let state_inst = this.getManager(state_id);
      if (state_inst) {
        // TODO: warn that we are trying to create a manager that exists
        return state_inst;
      } else {
        if (config.state) {
          state_inst = this.createStateByClass(config.state, props);
          if (state_inst.registerComponent) {
            state_inst.registerComponent({}, {}, config);
          }
          this._states[state_id] = state_inst;
        }
        return state_inst;
      }
    } else {
      throw new Error("Component type does not exist: " + props.type);
    }
  }

  createStateByClass(stateClass, props) {
    if (stateClass) {
      return new stateClass(props);
    }
    return null;
  }

  //TODO: create state statemanagers from layout tree
  createLayoutState(layout_tree) {
    walkLayout(layout_tree, (props) => {
      if (props.type && props.id && props.config && (props.data || props.content || props.actions)) {
        this.createState(props);
      }
    });
  }
}

export const walkLayout = (layt, callback) => {

  const _walk = (_layt) => {
    for (let d in _layt) {
      if (callback && _layt[d]) { callback(_layt[d]); }
      if (_layt[d].data) {
        _walk(_layt[d].data);
      }
      if (_layt[d].content) {
        _walk([_layt[d].content]);
      }
      if (_layt[d].actions) {
        _walk([_layt[d].actions]);
      }
    }
  }
  _walk(layt);

}


