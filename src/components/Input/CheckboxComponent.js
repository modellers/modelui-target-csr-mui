import React from 'react';
// material ui components
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';// styles
import { withStyles } from '@mui/styles';
import getIcon from '../../util/IconUtil';

import { StateList, ListBase, events as baseEvents, triggers as baseTriggers } from '../../event/ListBase'

export const events = baseEvents;
export const triggers = baseTriggers;

export const options = {
  "id": "checkboxes",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Checkboxes",
  "description": "Checkbox options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "iconIsSelected": {
      "title": "iconIsSelected",
      "description": "iconIsSelected",
      "type": "string",
      "default": "material-ui:Star"
    },
    "iconUnSelected": {
      "title": "iconUnSelected",
      "description": "iconUnSelected",
      "type": "string",
      "default": "material-ui:StarOutline"
    },
    "labelPlacement": {
      "title": "labelPlacement",
      "description": "labelPlacement",
      "type": "string",
      "enum": ["bottom", "end", "start", "top"],
      "default": "bottom"
    },
    "size": {
      "title": "size",
      "description": "size",
      "type": "string",
      "enum": ['small', 'large', 'medium'],
      "default": "medium"
    },
    "color": {
      "title": "color",
      "description": "color",
      "type": "string",
      "enum": ['initial', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error'],
      "default": "primary"
    },
    "direction": {
      "title": "direction",
      "description": "direction",
      "type": "string",
      "enum": ['row', 'row-reverse', 'column', 'column-reverse'],
      "default": "row"
    }
  },
  "required": ["iconIsSelected", "iconUnSelected", "labelPlacement", "size", "color", "direction"]
}

export const item = {
  "id": "checkbox",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Checkbox",
  "description": "Checkbox item",
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
      "description": "title",
      "type": "string",
      "default": "Checkbox"
    },
    "selected": {
      "description": "Selected",
      "type": "boolean",
      "default": false
    }
  },
  "required": []
}

export const config = {

  name: "Checkboxes",
  type: "checkboxes",
  author: "Kjartan Jónsson",
  description: "Checkbox component",
  version: 0.1,
  relation: {
    contains: ["checkbox"],
    within: "component" // parent
  },
  options: options,
  contains: {
    "checkbox": item
  },
  state: StateList
}

const style = (theme) => ({
  root: {
    justifyContent: 'center'
  },
});

class CheckboxComponent extends ListBase {

  handleSelect = (item, idx, evt) => {
    this.setSelectedId(item.id, evt, !item.selected);
  };

  renderFormLabel = (legend_text) => {
    if (legend_text) {
      return (<FormLabel component="legend">{legend_text}</FormLabel>)
    }
  }

  renderFormHelperText = (helper_text) => {
    if (helper_text) {
      return (<FormHelperText>{helper_text}</FormHelperText>)
    }
  }

  updateView = function (action, arr, updated, data) {
    // extend by parent
    if (action === 'select') {
      this.setState(data);
    }
    return true;
  };

  render() {
    const { classes, config } = this.props;
    // defaults
    const options = { ...{ direction: 'column', size: undefined, color: "secondary", labelPlacement: "start", iconIsSelected: undefined, iconUnSelected: undefined }, ...config.options }
    let helper_text = '';
    const legend_text = '';
    const error = '';
    let iconIsSelected = undefined;
    let iconUnSelected = undefined;


    // TODO: use other pallet instead of this hack
    if (options.color.includes("text")) { options.color = options.color.replace("text", "").toLowerCase(); }

    // If icons are use lets look them up
    if (options.iconIsSelected) { iconIsSelected = getIcon(options.iconIsSelected); }
    if (options.iconUnSelected) { iconUnSelected = getIcon(options.iconUnSelected); }

    // should we display error text
    if (error) { helper_text = error; }

    return (
      <FormControl required error={error !== ''} component="fieldset" className={classes.formControl}>

        {this.renderFormLabel(legend_text)}

        <FormGroup style={{ justifyContent: 'center' }} row={options.direction.includes('row')}>
          {this.state.data.map((itm, idx) =>
          (
            <FormControlLabel labelPlacement={options.labelPlacement} key={"form-control-label-" + itm.id}
              control={<Checkbox
                key={itm.id}
                onChange={(event) => this.handleSelect(itm, idx, event)} name={itm.id}
                color={options.color}
                size={options.size}
                disabled={itm.disabled || false}
                icon={iconUnSelected}
                checkedIcon={iconIsSelected}
              />
              }
              checked={itm.selected}
              label={itm.title}
            />
          )
          )}
        </FormGroup>
        {this.renderFormHelperText(helper_text)}
      </FormControl >
    )
  }
}

export default withStyles(style, { withTheme: true })(CheckboxComponent);
