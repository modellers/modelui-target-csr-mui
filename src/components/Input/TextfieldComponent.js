import React from 'react';
// material-ui
import TextField from '@mui/material/TextField'; // https://material-ui.com/components/text-fields/
// styles
import { withStyles } from '@mui/styles';
// event handler
import EventManager from '../../event/Event';
// input base
import { StateInput, events as inputEvents, triggers as inputTriggers, InputBase } from '../../event/InputBase';

export const events = inputEvents;
export const triggers = inputTriggers;

export const options = {
  "id": "textfield",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Textfield",
  "description": "Textfield options",
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
      "default": "Label text"
    },
    "placeholder": {
      "title": "Placeholder",
      "description": "placeholder",
      "type": "string",
      "default": ""
    }
  },
  "required": ["buttonVariant", "color"]
}


export const config = {
  name: "Textfield",
  type: "textfield",
  author: "Kjartan Jónsson",
  description: "Text input component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options,
  state: StateInput
}

const style = (theme) => ({ // https://material-ui.com/styles/basics/
});

class TextfieldComponent extends InputBase {
  /**
   * Used to manage internal state of avatars
   */
  constructor(props) {
    super(props);
    this.input_ref = null;
  }

  getActionState(action, callback) {
    if (this.input_ref) {
      if (action === 'submit') {
        callback({ data: { value: this.input_ref.value } });
      } else { callback(); }
    } else { callback(); }
  }


  updateView = function (action, val, updated, data) {
    // extend by parent
    if (this.input_ref) {
      if (action === 'enable') {
        this.input_ref.disabled = false;
      }
      if (action === 'disable') {
        this.input_ref.disabled = true;
      }
      if (action === 'populate') {
        this.input_ref.value = val.value;
      }
      if (action === 'clear') {
        this.input_ref.value = "";
      }
    }
    return true;
  };

  getUISchema = (schema) => {
    // enumerates schema and extracts uiSchema from ui-schema keywords
    // TODO: make this recursive for sub propertis
    const propAttributes = ["enumNames", "minLength", "maxLength"];
    let uiSchema = {}
    if (!schema) { schema = {}; }
    if (!schema.properties) { schema.properties = {}; }
    for (let prop in schema.properties) {
      for (let attr in schema.properties[prop]) {
        if (attr === "edit") { // rename this attribute to ui:options
          uiSchema[prop] = {};
          for (let p in schema.properties[prop][attr]) {
            uiSchema[prop]["ui:" + p] = schema.properties[prop][attr][p];
          }
          for (let i in propAttributes) {
            let move_attr = propAttributes[i];
            if (schema.properties[prop][attr][move_attr]) {
              schema.properties[prop][move_attr] = schema.properties[prop][attr][move_attr];
            }
          }

        }
      }
    }
    return uiSchema;
  }


  onChanged = (evt) => {
    // schema: formatData (only if valid)
    EventManager.getInstance().addEvent(this.props.id, "changed", { value: evt.target.value }, evt);
  }

  onKeyUp = (evt) => {
    if (evt.key === "Enter") {
      EventManager.getInstance().addEvent(this.props.id, "submitted", { value: evt.target.value }, evt);
    }
  }

  render() {

    // additional configuration options
    let configProps = {};

    // submit button 
    const hide_submit = true;
    if (hide_submit) { configProps.children = <div></div>; }

    // do not show error list
    configProps.howErrorList = false;
    configProps.ErrorList = this.OnInvalid;

    // forward custom uiSchema if defined
    if (this.props.uiSchema) {
      configProps.uiSchema = this.props.uiSchema;
    } else {
      configProps.uiSchema = this.getUISchema(this.props.schema);
    }

    return (<TextField
      id={this.props.id}
      onChange={this.onChanged}
      onKeyUp={this.onKeyUp}
      type="text"
      fullWidth={true}
      variant={this.props.config.options.variant}
      placeholder={this.props.config.options.placeholder}
      inputRef={instance => { this.input_ref = instance; }}
    />)
  }

}

export default withStyles(style, { withTheme: true })(TextfieldComponent);