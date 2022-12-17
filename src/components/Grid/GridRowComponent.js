// https://material-ui.com/components/autocomplete/
// styles
import { withStyles } from '@mui/styles';

import { StateGrid, GridComponent, events as baseEvents, triggers as baseTriggers } from './GridComponent'
export const events = baseEvents;
export const triggers = baseTriggers;

export const options = {
  "id": "grid-rows",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Grid Row",
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
  "required": ["spacing", "alignItems", "justifyContent"]
}


export const item = {
  "id": "grid-row",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Grid row",
  "description": "Grid row",
  "x-layout": "component-item",
  "type": "object",
  "version": 0.1,
  "properties": {
    "id": {
      "readOnly": false,
      "writeOnly": false,
      "description": "TBD",
      "type": "string"
    },
    "gridXS": {
      "title": "gridXS",
      "description": "TBD",
      "type": "number",
      "default": 4
    },
    "gridSM": {
      "title": "gridSM",
      "description": "TBD",
      "type": "number",
      "default": 4
    },
    "hidden": {
      "title": "hidden",
      "description": "TBD",
      "type": "boolean",
      "default": false
    },
    "content": {
      "title": "content",
      "description": "TBD",
      "readOnly": false,
      "writeOnly": false,
      "type": "object",
      "default": {}
    }
  },
  "required": ["gridXS", "gridSM"]
}

export const config = {
  name: "Grid rows",
  type: "grid-rows",
  author: "Kjartan Jónsson",
  description: "Grid component",
  version: 0.1,
  relation: {
    contains: ["grid-row"],
    within: "component" // parent
  },
  options: options,
  contains: {
    'grid-row': item
  },
  state: StateGrid
  // styles
}

const style = (theme) => ({
});

export class GridRowComponent extends GridComponent {
  /**
   * Used to manage internal state of avatars
   */

  constructor(props) {
    props.config.options = props.config.options || {};
    props.config.options = { ...{ spacing: 1, justifyContent: 'center', alignItems: 'stretch', gridXS: 12, gridSM: 12 }, ...props.config.options, ...{ direction: 'column' } }
    super(props);
  }
}

export default withStyles(style, { withTheme: true })(GridRowComponent);
