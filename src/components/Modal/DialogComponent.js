// https://material-ui.com/components/dialogs/
import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { withStyles } from '@mui/styles';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { renderContent } from '../../util/ComponentUtil';


// event handler
import EventHandler from '../../event/Event';

export const triggers = {
  show: {
    alias: [],
    info: {
      name: 'Show',
      description: 'Show dialog'
    },
    schema: {}
  },
  close: {
    alias: [],
    info: {
      name: 'Close',
      description: 'Close dialog'
    },
    schema: {}
  }
};

export const events = {
  showing: {
    alias: [],
    info: {
      name: 'Showing',
      description: 'Showing Dialog'
    },
    schema: {}
  },
  closed: {
    alias: [],
    info: {
      name: 'Closed',
      description: 'Closed Dialog'
    },
    schema: {}
  },
  confirmed: {
    alias: [],
    info: {
      name: 'Confirmed',
      description: 'User confirmed action'
    },
    schema: {}
  }
};

export const options = {
  "id": "dialog",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Dialog options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "modalType": {
      "title": "modalType",
      "description": "modalType",
      "type": "string",
      "enum": ["alert", "dialog", "modal"],
      "default": 1
    }
  },
  "required": ["modalType"]
}

export const config = {
  name: "Dialog",
  type: "dialog",
  author: "Kjartan Jónsson",
  description: "Dialog component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options
}

const modalStyles = (theme) => ({
  root: {
  },
  closeButton: {
    position: 'absolute',
    color: theme.palette.grey[500],
  },
});

const DialogTitleClosable = withStyles(modalStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function DialogRender(id, data, classes, config_render, open, setOpen, modal_body) {
  if (!config_render.options) { config_render.options = {} }
  config_render.options.modalType = config_render.options.modalType || 'alert';
  config_render.options.labelCancel = config_render.options.labelCancel || 'Cancel'; // default cancel button label is cancel
  const handleClose = (opt) => {
    setOpen(false);
    EventHandler.getInstance().addEvent(id, 'closed', opt || {}, {});
    if (opt && opt.confirm) {
      EventHandler.getInstance().addEvent(id, 'confirmed', opt || {}, {});
    }
  };

  const handleDone = () => {
    handleClose();
  }

  if (config_render.options.modalType === 'modal') {

    // A Modal is a mode of a UI (commonly that of a Dialog Box) that makes the user's response a requirement. 
    // In other words, the user is required to choose an action and there is no option to ignore or dismiss the message.

    return (
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        <DialogTitle>{data.title}</DialogTitle>
        <DialogContent>
          {modal_body}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDone} color="primary" autoFocus>
            {data.label}
          </Button>
        </DialogActions>
      </Dialog>
    );

  } else if (config_render.options.modalType === 'dialog') {
    // A Dialog or Dialog Box is a type of UI that speaks to the user and requests for the user's response. 
    // User could opt to ignore or dismiss the message.
    const DialogTitle = DialogTitleClosable;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        <DialogTitle>{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data.description}
          </DialogContentText>

          {modal_body}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose({ 'confirm': true }) }} color="primary" autoFocus>
            {data.label}
          </Button>
        </DialogActions>
      </Dialog >
    );
  } else if (config_render.options.modalType === 'confirm') {
    // A Dialog box with yes or no option 
    // User could opt to ignore or dismiss the message.
    const DialogTitle = DialogTitleClosable;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="form-dialog-description"
      >
        <DialogTitle>{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data.description}
          </DialogContentText>
          {modal_body}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleClose({ 'confirm': false }) }} color="secondary">
            {config_render.options.labelCancel}
          </Button>
          <Button onClick={() => { handleClose({ 'confirm': true }) }} color="primary" autoFocus>
            {data.label}
          </Button>
        </DialogActions>
      </Dialog>
    );

  } else {
    // Alerts only contains text and and dismiss button
    const DialogTitle = DialogTitleClosable;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data.description}
          </DialogContentText>
          {modal_body}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {data.label}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


export function DialogComponent(props) {
  // events

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setTimeout(function () {
      EventHandler.getInstance().addEvent(props.id, 'showing', {}, {});
    }, 100); // add delay since dialog content is not ready

  };
  const handleClose = () => {
    setOpen(false);
    EventHandler.getInstance().addEvent(props.id, 'closed', {}, {});
  };

  // options
  const classes = {}; //useStyles();
  // register componenet

  EventHandler.getInstance().register(
    props.id, {
    'show': {
      schema: {},
      handler: (obj) => {
        handleOpen();
      }
    },
    'close': {
      schema: {},
      handler: (obj) => {
        handleClose();
      }
    }
  }, {}, config
  );

  let body = null;
  // set defaults
  let dialogConfig = props.config || {};
  // FIXME: SEE IF THIS CHANGED ANYTING -- config.options = props.config.options || {};
  // special case variants

  if (props.data.content) {
    body = renderContent(classes, props.data);
  }
  return DialogRender(props.id, props.data, classes, dialogConfig, open, setOpen, body);
}
