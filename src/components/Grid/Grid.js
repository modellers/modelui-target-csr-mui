import React from 'react';

import ContainerComponent, { events as eventsContainer, triggers as triggersContainer, config as configContainer } from './ContainerComponent'
import TabsComponent, { events as eventsTabs, triggers as triggersTabs, config as configTabs } from './TabsComponent'
import GridComponent, { events as eventsGrid, triggers as triggersGrid, config as configGrid } from './GridComponent'
import GridRowComponent, { events as eventsGridRow, triggers as triggersGridRow, config as configGridRow } from './GridRowComponent'
import GridColumnComponent, { events as eventsGridColumn, triggers as triggersGridColumn, config as configGridColumn } from './GridColumnComponent'
import AccordionComponent, { events as eventsAccordion, triggers as triggersAccordion, config as configAccordion } from './AccordionComponent'
import LayoutComponent, { events as eventsLayout, triggers as triggersLayout, config as configLayout } from '../Layout/LayoutComponent'
import ViewComponent, { events as eventsView, triggers as triggersView, config as configView } from '../Layout/ViewComponent'

export function View(props) {
    // TODO: wrap in separate component that supports routing
    return (<ViewComponent {...props} />);
}

export function Layout(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<LayoutComponent {...props} />);
}

export function Container(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<ContainerComponent {...props} />);
}

export function Grid(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<GridComponent {...props} />);
}

export function GridColumn(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<GridColumnComponent {...props} />);
}

export function GridRow(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<GridRowComponent {...props} />);
}

export function Accordion(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<AccordionComponent {...props} />);
}

export function Tabs(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<TabsComponent {...props} />);
}


export function registerView(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: View,
        type: configView.type,
        events: eventsView,
        triggers: triggersView,
        config: configView
    });
}

export function registerContainer(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Container,
        type: configContainer.type,
        events: eventsContainer,
        triggers: triggersContainer,
        config: configContainer
    });
}

export function registerGrid(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Grid,
        type: 'grid', // configGrid.type,
        events: eventsGrid,
        triggers: triggersGrid,
        config: configGrid
    });
}

export function registerGridColumn(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: GridColumn,
        type: configGridColumn.type,
        events: eventsGridColumn,
        triggers: triggersGridColumn,
        config: configGridColumn
    });
}

export function registerGridRow(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: GridRow,
        type: configGridRow.type,
        events: eventsGridRow,
        triggers: triggersGridRow,
        config: configGridRow
    });
}

export function registerAccordion(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Accordion,
        type: configAccordion.type,
        events: eventsAccordion,
        triggers: triggersAccordion,
        config: configAccordion
    });
}

export function registerTabs(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Tabs,
        type: configTabs.type,
        events: eventsTabs,
        triggers: triggersTabs,
        config: configTabs
    });
}

export function registerLayout(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Layout,
        type: configLayout.type,
        events: eventsLayout,
        triggers: triggersLayout,
        config: configLayout
    });
}
