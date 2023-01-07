import React from 'react';
// material ui components
import { List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '../../theme/components';
// styles
import { withStyles } from '../../theme/components';
// render
import { renderContent } from '../../util/ComponentUtil';

// DD components
import { AvatarRender } from '../Avatar/AvatarComponent'

import { structs } from 'modelui-core-runtime';

export const events = structs.ListBase.events;
export const triggers = structs.ListBase.triggers;

export const options = {
  "id": "list",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "List options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "select": {
      "title": "Select",
      "description": "Shows selected rows highlighted",
      "type": "boolean",
      "default": false
    },
  },
  "required": []
}

export const item = {
  "id": "list-item",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "List item",
  "description": "Placed in list",
  "x-layout": "component-item",
  "type": "object",
  "version": 0.1,
  "properties": {
    "id": {
      "description": "identifier",
      "type": "string",
      "readOnly": false,
      "writeOnly": false
    },
    "title": {
      "description": "Title",
      "type": "string",
      "default": "Option"
    },
    "subtitle": {
      "description": "Sub title",
      "type": "string",
      "default": ""
    }
  },
  "required": ["title"]
}

export const config = {
  name: "List",
  type: "list",
  author: "Kjartan Jónsson",
  description: "List component",
  version: 0.1,
  relation: {
    contains: ["list-item"],
    within: "component" // parent
  },
  contains: {
    "list-item": item
  },
  options: options,
  state: structs.ListBase.StateList
}

const style = (theme) => ({
  root: {
    width: '100%'
  },
});

function ListAvatar(props) {
  if (!props.avatar) return null;
  return (  // render array of avatars
    <ListItemAvatar>
      <AvatarRender config={props.avatar.config} data={props.avatar.data} />
    </ListItemAvatar>
  )

}

class ListComponent extends structs.ListBase.ListBase {

  secondaryAction = (itm, classes) => {
    if (itm.secondary) {
      const action = renderContent(classes, { "content": itm.secondary });
      if (action) {
        return (<ListItemSecondaryAction>{action}</ListItemSecondaryAction>)
      }
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <List className={classes.root}>
        {this.state.data.map((itm, idx) =>
        (
          <ListItem
            key={itm.id}
            selected={this.showSelectedRow(itm)}
            onClick={(event) => this.handleSelect(itm[idx], itm, idx)}
          >
            <ListAvatar avatar={itm.avatar} />
            <ListItemText primary={itm.title} secondary={itm.subtitle} />
            {this.secondaryAction(itm, classes)}
          </ListItem>
        )
        )}
      </List>
    )
  }
}

export default withStyles(style, { withTheme: true })(ListComponent);
