import React from 'react';

import ImageComponent, { events, triggers, config } from './ImageComponent';

export function Image(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ImageComponent {...props} />);
}

////////////////////////////////////////////////


export function registerImage(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Image,
        type: config.type,
        events: events,
        triggers: triggers,
        config: config
    });
}
