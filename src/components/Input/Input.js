import React from 'react';

import TextfieldComponent, { events as eventsTextfield, triggers as triggersTextfield, config as configTextfield } from './TextfieldComponent'
import CheckboxComponent, { events as eventsCheckbox, triggers as triggersCheckbox, config as configCheckbox } from './CheckboxComponent'

export function Textfield(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<TextfieldComponent {...props} />);
}

export function Checkbox(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<CheckboxComponent {...props} />);
}

export function registerTextfield(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Textfield,
        type: configTextfield.type,
        events: eventsTextfield,
        triggers: triggersTextfield,
        config: configTextfield
    });
}

export function registerCheckbox(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Checkbox,
        type: configCheckbox.type,
        events: eventsCheckbox,
        triggers: triggersCheckbox,
        config: configCheckbox
    });
}