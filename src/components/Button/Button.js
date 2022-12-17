import React from 'react';

import ButtonComponent, { events, triggers, config } from './ButtonComponent'

export function Button(props) {
  // lets enumerate schema to extract uiSchema and validation
  return (<ButtonComponent {...props} />);
}

export function registerButton(component_manager) {
  // self register component to layout manager
  component_manager.registerComponent({
    component: Button,
    type: config.type,
    events: events,
    triggers: triggers,
    config: config
  });
}

