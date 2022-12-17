import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
// import MenuList from '@mui/material/MenuList';

// TODO: https://v4.mui.com/components/snackbars/
// TODO: Alert type (add default style)
// TODO: Message text, Duration, Position
// TODO: Action
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/lab/Alert';

// event handler
import EventManager from '../../event/Event';
// import {ComponentMenuItem} from './MenuItem';

export const events = { // copy from DialogComponents
  showing: {
    alias: [],
    info: {
      name: 'Showing',
      description: 'Showing snackbar'
    },
    schema: {}
  },
  closed: {
    alias: [],
    info: {
      name: 'Closed',
      description: 'Closed snackbar'
    },
    schema: {}
  },
  closing: {
    alias: [],
    info: {
      name: 'Closing',
      description: 'Closing through user interaction'
    },
    schema: {}
  }
};

export const triggers = {
  show: {
    alias: [],
    info: { name: 'Show', description: 'Shows snackbar' },
    schema: {}
  },
  close: {
    alias: [],
    info: { name: 'Close', description: 'Close snackbar' },
    schema: {}
  }
};


export const options = {
  "id": "popup-toaster",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Sortable Tree options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "severity": {
      "title": "Severity",
      "description": "Severity",
      "type": "string",
      "enum": ['error', 'warning', 'info', 'success'],
      "default": "info"
    },
    "duration": {
      "title": "Duration",
      "description": "Duration",
      "type": "number",
      "default": 6000
    },
    "vertical": {
      "title": "Vertical",
      "description": "Vertical",
      "type": "string",
      "enum": ['top', 'bottom'],
      "default": "top"
    },
    "horizontal": {
      "title": "Horizontal",
      "description": "Horizontal",
      "type": "string",
      "enum": ['left', 'center', 'right'],
      "default": "center"
    },
  },
  "required": ["severity", "color", "vertical", "horizontal"]
}


export const config = {

  name: "Snackbar",
  type: "popup-toaster",
  author: "Kjartan Jónsson",
  description: "Snack bar component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options
}

const style = theme => ({
  root: {
    width: '100%',
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}


class SnackbarComponent extends Component {
  /**
   * Used to manage internal state of avatars
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.viewStyle = props.config.options || {};
    this.state = this._getStateValues(false, {});

    // register componenet overiding or adding new event handlers
    this.events = EventManager.getInstance().register(this.props.id, {
      show: {
        schema: {},
        handler: (obj) => {
          this.showSnackbar(obj, true);
        }
      },
      close: {
        schema: {},
        handler: (obj) => {
          this.showSnackbar(obj, false);
        }
      }
    }, events, config);

  }

  _getStateValues = (open, obj) => {
    return {
      vertical: this.viewStyle.vertical || 'top', // top, bottom,
      horizontal: this.viewStyle.horizontal || 'center',  // left, center, right
      severity: obj.severity || this.viewStyle.severity || 'info', // error, warning, info, success
      duration: obj.duration || this.viewStyle.duration || 6000,
      variant: 'filled', // always use filled
      open: open
    }
  }

  showSnackbar = (obj, open) => {
    let state = this._getStateValues(open, obj);
    if (open) {
      state.message = obj.title || '!';
      this.setState(state);
      EventManager.getInstance().addEvent(this.props.id, this.events['showing'].id, { ...state }, null);
    } else {
      this.setState({ ...this.state, ...{ open: open } });
      EventManager.getInstance().addEvent(this.props.id, this.events['closed'].id, { ...state }, null);
    }

  };

  handleClose = (evt, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    EventManager.getInstance().addEvent(this.props.id, this.events['closing'].id, { ...this.state }, null);
    this.showSnackbar(this.state, false);
  }

  render() {

    const key = this.state.vertical + this.state.horizontal;
    this.viewStyle = this.props.config.options;

    return (
      <div>
        <React.Fragment>
          <Snackbar
            key={key}
            open={this.state.open}
            autoHideDuration={this.state.duration}
            anchorOrigin={{ vertical: this.state.vertical, horizontal: this.state.horizontal }}
            onClose={this.handleClose}>
            <Alert onClose={this.handleClose} variant={this.state.variant} severity={this.state.severity} sx={{ width: '100%' }}>
              {this.state.message}
            </Alert>
          </Snackbar>
        </React.Fragment>
      </div>
    )

  }
}

export default withStyles(style, { withTheme: true })(SnackbarComponent);
