import React from 'react';

import MenuComponent, { events as eventsMenu, triggers as triggersMenu, config as configMenu } from './MenuComponent'

export function Menu(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<MenuComponent {...props} />);
}

export function registerMenu(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Menu,
        type: configMenu.type,
        events: eventsMenu,
        triggers: triggersMenu,
        config: configMenu
    });
}
