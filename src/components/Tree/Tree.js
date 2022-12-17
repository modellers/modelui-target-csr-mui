import React from 'react';

import TreeComponent, { events, triggers, config } from './TreeComponent'

export function Tree(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<TreeComponent {...props} />);
}

export function registerTree(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Tree,
        type: config.type,
        events: events,
        triggers: triggers,
        config: config
    });
}
