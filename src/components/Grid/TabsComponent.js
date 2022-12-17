// https://material-ui.com/components/tabs/
// https://www.digitalocean.com/community/tutorials/react-tabs-component
import React from 'react';
// material ui components

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// styles
import { withStyles } from '@mui/styles';
import getIcon from '../../util/IconUtil';
import { StateLayout, LayoutBase, events as baseEvents, triggers as baseTriggers } from '../Layout/LayoutBase'
export const events = baseEvents;
export const triggers = baseTriggers;

export const options = {
  "id": "tabs",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Tabs",
  "description": "Tabs options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "textColor": {
      "title": "textColor",
      "description": "textColor",
      "type": "string",
      "enum": ["inherit", "primary", "secondary"],
      "default": "inherit"
    },
    "indicatorColor": {
      "title": "indicatorColor",
      "description": "indicatorColor",
      "type": "string",
      "enum": ['initial', 'inherit', 'primary', 'secondary'],
      "default": "secondary"
    },
    "tabVariant": {
      "title": "tabVariant",
      "description": "tabVariant",
      "type": "string",
      "enum": ["fullWidth", "scrollable", "standard"],
      "default": "standard"
    },
    "contentMargin": {
      "title": "contentMargin",
      "description": "contentMargin",
      "type": "number",
      "default": 1
    },
  },
  "required": ["textColor", "indicatorColor", "tabVariant", "contentMargin"]
}

export const item = {
  "id": "tab",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Tab",
  "description": "Tab",
  "x-layout": "component-item",
  "type": "object",
  "version": 0.1,
  "properties": {
    "id": {
      "description": "identifier",
      "type": "string",
      "readOnly": false,
      "writeOnly": false
    },
    "title": {
      "description": "Title",
      "type": "string",
      "default": "Tab"
    },
    "icon": {
      "description": "Icon",
      "type": "string",
      "default": ""
    },
    "disabled": {
      "description": "Disabled",
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
  "required": ["title", "disabled"]
}

export const config = {
  name: "Tabs",
  type: "tabs",
  author: "Kjartan Jónsson",
  description: "Tabs component",
  version: 0.1,
  relation: {
    contains: ["tab"],
    within: "component" // parent
  },
  options: options,
  contains: {
    'tab': item
  },
  state: StateLayout
}

const style = (theme) => ({
});


class TabsComponent extends LayoutBase {
  /**
   * Used to manage internal state of avatars
   */

  static propTypes = {
    //data: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);
    // props.config = props.config || {};
    props.config.options = { ...{}, ...props.config.options }
    props.config.options.contentMargin = props.config.options.contentMargin || 3;
  }

  a11yProps(index) {
    return {
      id: `${this.props.id}-tab-${index}`,
      'aria-controls': `${this.props.id}-tabpanel-${index}`,
    };
  }

  handleChange(evt, idx) {
    this.setSelectedId(this.state.data[idx].id);
  }

  render() {

    const {
      state
    } = this;

    const { classes, config } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs textColor={config.options.textColor} indicatorColor={config.options.indicatorColor} variant={config.options.tabVariant} value={this.state.selectedIndex} onChange={(evt, idx) => { this.handleChange(evt, idx) }}>
            {state.data.map((itm, idx) =>
            (
              <Tab key={`${this.props.id}-tabpanel-${idx}`} icon={getIcon(itm.icon)} disabled={itm.disabled || false} label={itm.title} {...this.a11yProps(idx)} />
            )
            )}
          </Tabs>
        </AppBar>
        {state.data.map((itm, idx) =>
        (
          <div
            key={`${this.props.id}-tabpanel-${idx}`}
            role="tabpanel"
            hidden={state.selectedIndex !== idx}
            id={`${this.props.id}-tabpanel-${idx}`}
            aria-labelledby={`${this.props.id}-tab-${idx}`}
          >
            {state.selectedIndex === idx && (
              <Box p={config.options.contentMargin}>
                <div>{this.renderContent(classes, itm)}</div>
              </Box>
            )}
          </div>
        )
        )}
      </div>
    )
  }
}

export default withStyles(style, { withTheme: true })(TabsComponent);

export const schema = {
  "$id": "",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  description: "",
  type: "object",
  properties: {
    disabled: {
      type: "boolean"
    },
    title: {
      type: "string"
    },
    description: {
      type: "string"
    }
  }
}