import React from 'react';

import TextComponent, { events, triggers, config } from './TextComponent';

export function Text(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<TextComponent {...props} />);
}

////////////////////////////////////////////////


export function registerText(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Text,
        type: config.type,
        events: events,
        triggers: triggers,
        config: config
    });
}
