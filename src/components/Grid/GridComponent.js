// https://material-ui.com/components/autocomplete/
import React from 'react';
// material ui components
import Grid from '@mui/material/Grid';
// styles
import { withStyles } from '@mui/styles';

import { StateLayout, LayoutBase, events as baseEvents, triggers as baseTriggers } from '../Layout/LayoutBase'
export const events = baseEvents;
export const triggers = baseTriggers;

export const options = {
  "id": "grid-columns",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Grid",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "spacing": {
      "title": "spacing",
      "description": "Space between the grid items",
      "type": "number",
      "default": 1
    },
    "direction": {
      "description": "Grid item direction",
      "type": "string",
      "enum": ["row", "column"],
      "default": "row"
    },
    "alignItems": {
      "description": "Align content",
      "type": "string",
      "enum": ["stretch"],
      "default": "stretch"
    },
    "justifyContent": {
      "description": "Justify content",
      "type": "string",
      "enum": ["center", "left", "right"],
      "default": "center"
    },
    "gridXS": {
      "title": "gridXS",
      "description": "gridXS",
      "type": "number",
      "default": 2
    },
    "gridSM": {
      "title": "gridSM",
      "description": "gridSM",
      "type": "number",
      "default": 2
    }
  },
  "required": ["spacing", "direction", "alignItems", "justifyContent"]
}

export const config = {
  name: "Grid columns",
  type: "grid-columns",
  author: "Kjartan Jónsson",
  description: "Grid component",
  version: 0.1,
  relation: {
    contains: ["grid-column"],
    within: "component" // parent
  },
  options: options,
  state: StateLayout
  // styles
}

const style = (theme) => ({
});

export const StateGrid = StateLayout;

export class GridComponent extends LayoutBase {
  /**
   * Used to manage internal state of avatars
   */

  constructor(props) {
    props.config.options = props.config.options || {};
    props.config.options = { ...{ spacing: 1, direction: 'row', justifyContent: 'center', alignItems: 'stretch', gridXS: 12, gridSM: 12 }, ...props.config.options }
    super(props);
  }

  renderGrid = (itm, idx, classes) => {
    if (!itm.hidden) {
      return (
        <Grid item key={itm.id} xs={itm.gridXS || this.props.config.options.gridXS || 12} sm={itm.gridSM || this.props.config.options.gridSM || 12} style={{ textAlign: itm.justifyContent || 'inherit' }}>
          {this.renderContent(classes, itm)}
        </Grid >
      )
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={this.props.config.options.spacing}
        direction={this.props.config.options.direction}
        justifyContent={this.props.config.options.justifyContent} // missmatch storybook vs app
        alignItems={this.props.config.options.alignItems}
      >
        {
          this.state.data.map((itm, idx) => { return this.renderGrid(itm, idx, classes); })
        }
      </Grid>
    )
  }
}

export default withStyles(style, { withTheme: true })(GridComponent);
