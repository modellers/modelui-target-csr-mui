import React from 'react';

import CardComponent, { events, triggers, config } from './CardComponent'

export function Card(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<CardComponent {...props} />);
}

export function registerCard(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Card,
        type: config.type,
        events: events,
        triggers: triggers,
        config: config
    });
}