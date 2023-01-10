import { Component } from 'react';

export class StateBaseComponent extends Component {
  /**
   * Used to manage internal state of avatars
   */
  constructor(props) {
    super(props);
    this.props = props;

    // check for component manager
    if (!this.props.manager) {
      throw "Manager was not provided through props for component " + this.props.id;
    }

    // make sure the manager is of correct type
    /*
    if (this.props.manager.constructor.name !== 'ComponentManager') {
      throw "Constructor must be component manager. Got '" + this.props.manager.constructor.name + "' for component " + this.props.id;
    }
    */

    // get the state memory manager
    this.stateManager = this.props.manager.getStateFactory().getManager(this.props.id);
    if (!this.stateManager) {
      throw new Error("State manager is missing for component '" + this.props.id + "'. Should have been created by traversing layout tree");
    }

    if (this.stateManager) {
      // apply initial state
      this.state = this.stateManager.getState();
    }
  }

  componentDidMount = () => {
    if (this.stateManager) { this.stateManager.doMount(this); }
  }

  componentWillUnmount = () => {
    if (this.stateManager) { this.stateManager.unMount(this); }
  }

  updateView = (action, arr, updated, data) => {
    // extend by parent
    return true;
  }

  triggerEvent(event, data, evt) {
    this.props.manager.getEventManager().addEvent(this.props.id, event, data, evt);
  }

  triggerAction(action, data, evt) {
    this.props.manager.getEventManager().addAction(this.props.id, action, data, null, evt);
  }

  setInstanceState(state) {
    if (this.stateManager) { this.stateManager.setState(state); }
  }

}
