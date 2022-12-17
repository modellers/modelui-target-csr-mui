// https://material-ui.com/components/tabs/
// https://www.digitalocean.com/community/tutorials/react-tabs-component
import React from 'react';
// styles
import { withStyles } from '@mui/styles';

import { StateLayout, LayoutBase, events as baseEvents, triggers as baseTriggers } from '../Layout/LayoutBase'
export const events = baseEvents;
export const triggers = baseTriggers;
export const options = {
  "id": "container",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Container options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {},
  "required": []
}

export const config = {
  name: "Containers",
  type: "container",
  author: "Kjartan Jónsson",
  description: "Container component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  contains: {},
  options: options,
  state: StateLayout
}


const style = (theme) => ({
});

class ContainerComponent extends LayoutBase {
  /**
   * Displays one rendered content at a time.
   */

  constructor(props) {
    props.config.options = { ...{}, ...props.config.options }
    super(props);
  }

  render() {

    const { classes } = this.props;

    // FIXME: render all views (do we need this)?
    this.state.data.forEach((itm, idx, arr) => {
      arr[idx].__render = this.renderContent(classes, itm);
      arr[idx].__visible = false;
    });

    if ((0 <= this.state.selectedIndex) && (this.state.selectedIndex < this.state.data.length)) {
      this.state.data[this.state.selectedIndex].__visible = true;
    } else {
      // TODO: notify index out of bounds
    }
    return (
      <div className={classes.root} style={{ overflow: 'scroll', whiteSpace: 'nowrap' }}>
        {this.state.data.map((itm, idx) =>
        (
          <div key={itm.id} style={{ display: (itm.__visible ? 'block' : 'none') }}>{itm.__render}</div>
        )
        )}
      </div>
    )
    /*
    return (
      <div className={classes.root}>
        {itm.__render}
      </div>
    )
    */
  }
}

export default withStyles(style, { withTheme: true })(ContainerComponent);
