import React from 'react';

import { DialogComponent, events as eventsDialog, triggers as triggersDialog, config as configDialog } from './DialogComponent';
import SnackbarComponent, { events as eventsSnackbar, triggers as triggersSnackbar, config as configSnackbar } from './SnackbarComponent';

export function Dialog(props) { // FIXME ---> Note we are using Dialog as root (just like view)
  // lets enumerate schema to extract uiSchema and validation
  return (<DialogComponent {...props} />);
}

export function PopupToaster(props) {
  // lets enumerate schema to extract uiSchema and validation
  return (<SnackbarComponent {...props} />);
}

export function registerDialog(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: DialogComponent, // FIXME ---> Note we are using Dialog as root (just like view)
    type: configDialog.type,
    events: eventsDialog,
    triggers: triggersDialog,
    config: configDialog
  });
}

export function registerPopup(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: PopupToaster,
    type: configSnackbar.type,
    events: eventsSnackbar,
    triggers: triggersSnackbar,
    config: configSnackbar
  });
}