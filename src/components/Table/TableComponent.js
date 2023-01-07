
// https://material-ui.com/components/autocomplete/
import React from 'react';
// table
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '../../theme/components';
// style
import { withStyles } from '../../theme/components';
// state
import { structs } from 'modelui-core-runtime';

export const events = structs.ListSchemaBase.events;
export const triggers = structs.ListSchemaBase.triggers;

export const options = {
  "id": "table",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Table options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "_$data": {
      "title": "Data",
      "description": "Data properties displayed in table",
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
  "required": ["size", "_$data", "select"]
}

export const config = {

  name: "Table",
  type: "table",
  author: "Kjartan Jónsson",
  description: "Table component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options,
  state: structs.ListSchemaBase.StateSchemaList
}

// https://mui.com/material-ui/api/table-row/#css
const style = (theme) => ({
  root: {
    width: '100%',
  }
});

class TableComponent extends structs.ListSchemaBase.ListSchemaBase {
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
        id: prop_name,
        label: prop['title'] || prop_name,
        align: prop['type'] === 'number' ? 'right' : 'left',
        style: { minWidth: 170 },
        format: format
      }

      const hidden = ((prop['readOnly'] === true) && (prop['writeOnly'] === true))
      if (!hidden) {
        columns.push(column);
      }
    }
    return columns;
  }

  handleEventOnChange = (evt, newValue, oldValue) => {
    this.handleSelect(newValue, { id: newValue.id }, -1);
  }

  handleRowSelect = (key, row, row_index, evt) => {
    this.setSelectedId(key);
  }

  renderTableRowCell = (column, row, row_index) => {
    const value = row[column.id];
    return (
      <TableCell key={column.id + '-' + row_index} align={column.align}>
        {column.format ? column.format(value) : value}
      </TableCell>
    );
  }

  render() {
    const { classes } = this.props;
    const key = "id";
    const columns = this.getSchemaColumns(this.state.schema);
    const rows = this.state.data;

    // render table
    return (
      <TableContainer>
        <Table className={classes.table} size={this.props.config.options.size} >
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => {
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.style.minWidth, textAlign: column.align }}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.map((row, row_index) => {
                //this.state.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, row_index) => {
                return (
                  <TableRow hover selected={this.showSelectedRow(row)} tabIndex={-1} key={row[key]} onClick={(evt) => this.handleRowSelect(row[key], row, row_index, evt)} >
                    {columns.map(
                      (column) => {
                        return this.renderTableRowCell(column, row, row_index)
                      })
                    }
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default withStyles(style, { withTheme: true })(TableComponent);
