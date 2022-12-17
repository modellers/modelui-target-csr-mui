import React from 'react';

import TableComponent, { events as eventsTable, triggers as triggersTable, config as configTable } from './TableComponent'
import DataGridComponent, { events as eventsDataGrid, triggers as triggersDataGrid, config as configDataGrid } from './DataGridComponent'

export function Table(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<TableComponent {...props} />);
}

export function registerTable(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: Table,
        type: configTable.type,
        events: eventsTable,
        triggers: triggersTable,
        config: configTable
    });
}


export function DataGrid(props) {
    // lets enumerate schema to extract uiSchema and validation
    return (<DataGridComponent {...props} />);
}

export function registerDataGrid(component_manager) {
    // self register component to layout manager
    component_manager.registerComponent({
        component: DataGrid,
        type: configDataGrid.type,
        events: eventsDataGrid,
        triggers: triggersDataGrid,
        config: configDataGrid
    });
}
