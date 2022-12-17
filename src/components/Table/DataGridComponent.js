// https://material-ui.com/components/autocomplete/
import React from 'react';
// material ui components
import { withStyles } from '@mui/styles';
// material ui table
import { DataGrid } from '@mui/x-data-grid';

import { StateSchemaList, ListSchemaBase, events as baseEvents, triggers as baseTriggers } from '../../event/ListSchemaBase'

export const events = baseEvents;
export const triggers = baseTriggers;

export const options = {
  "id": "datagrid",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Data Grid options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "schema": {
      "title": "Schema",
      "description": "Schema properties displayed in table",
      "type": "string",
      "enum": [],
      "default": ""
    },
    "size": {
      "title": "Size",
      "description": "The height of the row",
      "type": "string",
      "enum": ['small', 'medium'],
      "default": "medium"
    },
    "select": {
      "title": "Select",
      "description": "Shows selected rows highlighted",
      "type": "boolean",
      "default": false
    }
  },
  "required": ["size", "schema", "select"]
}

export const config = {

  name: "DataGrid",
  type: "datagrid",
  author: "Kjartan Jónsson",
  description: "Data Grid component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options,
  state: StateSchemaList
}

// https://mui.com/material-ui/api/table-row/#css
const style = (theme) => ({
  root: {
    width: '100%'
  }
});

class DataGridComponent extends ListSchemaBase {
  /**
   * Used to manage internal state of avatars
   */

  constructor(props) {
    super(props);

    if (!props.config.options) { props.config.options = { size: options.properties.size.default, select: options.properties.select.default } }
  }

  getSchemaColumns = (schema) => {
    let columns = [];
    if (!schema) { schema = {}; }
    if (!schema.properties) { schema.properties = {}; }
    for (let prop_name in schema.properties) {
      let prop = schema.properties[prop_name];
      let format = undefined; // by default treat everything as string
      if (prop['type'] === 'number') { format = (value) => value; } // FIXME: local locale
      if (prop['format'] === 'date') { format = (value) => value; } // FIXME: handle date 
      if (prop['type'] === 'date-time') { format = (value) => value; } // FIXME: handle date-time

      const column = {
        field: prop_name,
        headerName: prop['title'] || prop_name,
        // align: prop['type'] === 'number' ? 'right' : 'left',
        // width: 150,
        description: prop['description'] || undefined,
        sortable: false,
        editable: true,
      }

      const hidden = ((prop['readOnly'] === true) && (prop['writeOnly'] === true))
      if (!hidden) {
        columns.push(column);
      }
    }
    return columns;
  }

  handleEventOnChange = (newValue, evt, oldValue) => {
    const change = { id: newValue.id }
    change[newValue.field] = newValue.value;
    this.updateData(change, change, true);
  }

  updateView = (action, obj, idxs) => {
    if (action === "select") {
      if (this._ref) {
        this._ref.selectRow(1);
      }
      return true;
    }
  }

  render() {
    const { classes } = this.props;
    const columns = this.getSchemaColumns(this.state.schema);
    const key = "id";
    // https://v4.mui.com/api/data-grid/data-grid/
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={this.state.data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // onRowClick={this.handleRowSelect}
          // onRowEditCommit={this.handleRowSelect}
          selectionChange={this.handleRowSelect}
          onCellEditCommit={this.handleEventOnChange}
          editMode={"cell"}
          checkboxSelection
          disableSelectionOnClick
          ref={instance => { this._ref = instance; }}
        />
      </div>
    );
  }
}

export default withStyles(style, { withTheme: true })(DataGridComponent);

