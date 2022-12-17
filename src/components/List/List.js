import React from 'react';

import ListComponent, { events as eventsList, triggers as triggersList, config as configList } from './ListComponent'
import DropdownComponent, { events as eventsDropdown, triggers as triggersDropdown, config as configDropdown } from './DropdownComponent'

export function List(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ListComponent {...props} />);
}

export function Dropdown(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<DropdownComponent {...props} />);
}

export function registerList(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: List,
        type: configList.type,
        events: eventsList,
        triggers: triggersList,
        config: configList
    });
}

export function registerDropdown(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Dropdown,
        type: configDropdown.type,
        events: eventsDropdown,
        triggers: triggersDropdown,
        config: configDropdown
    });
}