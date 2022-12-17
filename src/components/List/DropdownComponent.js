// https://material-ui.com/components/autocomplete/
import React from 'react';
// material ui components
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/lab/Autocomplete';
import Box from '@mui/material/Box';
// styles
import { withStyles } from '@mui/styles';

import { StateList, ListBase, events as baseEvents, triggers as baseTriggers } from '../../event/ListBase'
export const events = baseEvents;
export const triggers = baseTriggers;

export const options = {
  "id": "dropdown",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Dropdown",
  "description": "Dropdown",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "variant": {
      "title": "variant",
      "description": "variant",
      "type": "string",
      "enum": ['standard', 'outlined', 'filled'],
      "default": "standard"
    },
    "color": {
      "title": "color",
      "description": "color",
      "type": "string",
      "enum": ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error'],
      "default": "primary"
    },
    "label": {
      "title": "label",
      "description": "label",
      "type": "string",
      "default": "contained"
    },
  },
  "required": ["buttonVariant", "color", "label"]
}

export const item = {
  "id": "dropdown-item",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Dropdown item",
  "description": "Placed in dropdown",
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
      "default": "Option"
    }
  },
  "required": ["title", "disabled"]
}

export const config = {
  name: "Dropdown",
  type: "dropdown",
  author: "Kjartan Jónsson",
  description: "Dropdown component",
  version: 0.1,
  relation: {
    contains: ["dropdown-item"],
    within: "component" // parent
  },
  contains: {
    "dropdown-item": item
  },
  options: options,
  state: StateList
}

const style = (theme) => ({
  root: {
    width: '100%',
    minWidth: 160
  },
  list: undefined, //  --> results in styles reference warnings??
  media: undefined,
  expand: undefined,
  expandOpen: undefined,
  avatar: undefined
});

class DropdownComponent extends ListBase {
  /**
   * Used to manage internal state of avatars
   */

  constructor(props) {
    if (!props.config.options) { props.config.options = { label: 'Dropdown', variant: 'outlined' } }
    super(props);
    this.user_typing = false;
  }

  handleEventOnChange = (evt, newValue, oldValue) => {
    if (newValue) {
      this.handleSelect(newValue, { id: newValue.id }, -1);
    }

  }

  updateView = function (action, arr, updated, data) {
    // extend by parent
    if (action === 'select') {
      this.setState(data);
    }
    return true;
  };

  getDefaultOption = () => {
    if (this.state.selectedId !== -1) {
      return this.state.data[this.state.selectedIndex];
    }
  }

  getOptionSelected = (opt, val) => {
    // FIXME: key to select
    if (this.state.data && opt) {
      if (this.state.selectedId === opt.id) {
        return this.state.data[this.state.selectedIndex];
      }
    }
    return null;
  }

  render() {
    // NOT USED const { classes } = this.props;
    return (
      <Box display="block" style={{ width: "100%" }}>
        <Autocomplete
          id={this.props.id}
          options={this.state.data || []}
          getOptionLabel={(option) => option.title}
          defaultValue={this.getDefaultOption}
          getOptionSelected={this.getOptionSelected} // FIXME: key to select
          onChange={this.handleEventOnChange}
          onFocus={(evt) => { this.user_typing = true; }}
          onBlur={(evt) => { this.user_typing = false; }}
          renderInput={(params) => {
            if (this.user_typing === false) {
              const selected_item = this.getDefaultOption();
              if (selected_item) {
                params.inputProps.value = selected_item.title; // FIXME: trying to select dynamically. This is what I came up with
              } else {
                params.inputProps.value = "";
              }
            }
            return (<TextField fullWidth {...params} label={this.props.config.options.label} variant={this.props.config.options.variant} />)
          }
          }
        />
      </Box>
    )
  }
}

export default withStyles(style, { withTheme: true })(DropdownComponent);

