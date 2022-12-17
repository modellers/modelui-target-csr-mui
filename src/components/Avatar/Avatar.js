import React from 'react';

import AvatarComponent, { events, triggers, config } from './AvatarComponent'

export function Avatar(props) {
    // lets enumerate schema to extract uiSchema and validation
    return <AvatarComponent {...props} />

}

export function register(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Avatar,
        type: config.type,
        events: events,
        triggers: triggers,
        config: config
    });
}