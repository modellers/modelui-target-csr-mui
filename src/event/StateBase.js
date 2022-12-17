import produce from "immer";

export class StateInstance {

  state = {};
  mount = null;

  /////////////////////////////////////////////////
  /// Internal helper functions
  /////////////////////////////////////////////////

  __updateObject(target, update) { // applies the changes
    // for each key/value pair in update object
    for (const [key, value] of Object.entries(update)) {
      // if target has the relevant key and
      // the type in target and update is the same
      if (target.hasOwnProperty(key) && typeof (value) === typeof (target[key])) {
        // update value if string,number or boolean
        if (['string', 'number', 'boolean'].includes(typeof value) || Array.isArray(value) || (Object.prototype.toString.call(value) === '[object Date]')) {
          target[key] = value;
        } else {
          // if type is object then go one level deeper
          if (typeof value === 'object') {
            this.__updateObject(target[key], value)
          }
        }
      }
    }
  }

  /////////////////////////////////////////////////
  // State functions
  /////////////////////////////////////////////////

  getState() {
    return this.state;
  }

  setState(updated_state, skip_component_update) {
    // Depricated: replace the current state with this one (legacy support)
    this.state = updated_state;
    if (skip_component_update) { return }
    if (this.mount) {
      if (this.mount.setState) { // make sure this mounted component has setState
        this.mount.setState(updated_state);
      }
    }
  }

  getActionState(action, callback) {
    if (this.mount) {
      if (this.mount.getActionState) { // make sure this mounted component has setState
        this.mount.getActionState(action, callback);
      } else { callback(); }
    } else { callback(); }
  }

  alterState(change, skip_component_update) {
    // does some immer magic (and calls setState)
    if (change === undefined) { return this.state; }
    if (typeof (change) === 'object') {
      const changed = produce(this.state, draft => {
        this.__updateObject(draft, change);
      })
      this.setState(changed, skip_component_update)
      return changed;
    } else {
      const changed = produce(this.state, change)
      this.setState(changed, skip_component_update)
      return changed;
    }
  }

  /////////////////////////////////////////////////
  /// Mounting functions used by visual components
  /////////////////////////////////////////////////

  doMount(component_instance) {
    this.mount = component_instance;
  }

  unMount(component_instance) {
    this.mount = null;
  }

  updateView(action, arr, updated, data) {
    // if the component is mounted we notify it to update its view
    if (this.mount) {
      if (this.mount.updateView) {
        this.mount.updateView(action, arr, updated, data);
      }
    }
    return true;
  }
}
