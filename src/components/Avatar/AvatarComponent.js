import React from 'react';
// material ui components
import { Avatar, AvatarGroup, Tooltip } from '../../theme/components';
// styles
import { withStyles } from '../../theme/components';
// common tools
import getIcon from '../../util/IconUtil';

// state handling
import { structs } from 'modelui-core-runtime';

export const options = {
  "id": "avatars",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Avatars",
  "description": "Avatar options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "select": {
      "title": "Select",
      "description": "Selectable avatar",
      "type": "boolean",
      "default": false
    },
    "shape": {
      "title": "Shape",
      "description": "The shape around our picture",
      "type": "string",
      "enum": ['circular', 'rounded', 'square'],
      "default": "circular"
    },
    "max_count": {
      "title": "Max count",
      "description": "Number of showing images, hiding rest behind number",
      "type": "number",
      "default": 4,
      "minimum": 1
    }
  },
  "required": ["shape", "max_count"]
}

export const events = structs.ListBase.events;
export const triggers = structs.ListBase.triggers;

export const config = {
  name: "Avatars",
  type: "avatars",
  author: "Kjartan Jónsson",
  description: "Avatar component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options,
  state: structs.ListBase.StateList
};

const style = (theme) => ({
});

export function AvatarRender(props) {

  if (!props.data) { return null; }

  // merge items with config
  const onAvatarClick = props.onAvatarClick || null;
  let items = props.data || [];
  let config = props.config || {};

  if (!config.options) { config.options = {}; }

  if (items.length === 1) {
    return (
      <AvatarSingleRender name={items[0].id} key={items[0].id} data={items[0]} config={props.config} onClick={onAvatarClick} />
    )
  } else {
    return (
      <AvatarGroup max={config.options.max}>
        {items.map(itm =>
          (<AvatarSingleRender name={itm.id} key={itm.id} data={itm} config={config} onClick={onAvatarClick} />)
        )}
      </AvatarGroup>
    )
  }
}

export function AvatarSingleRender(props) {

  const classes = {}; //useStyles();
  let config = props.data;
  if (!config) { return null; } // if no avatar exists we return nothing
  let config_text = config.title;
  let options = props.config.options || {};

  if (config.image) {
    // return image with title
    if (config.title) {
      return (
        <Tooltip title={config.title}>
          <Avatar name={props.name} key={config.name} alt={config.title} variant={options.shape} className={classes.config} src={config.image} onClick={props.onClick} />
        </Tooltip>
      )
    } else {
      return (
        <Avatar name={props.name} key={config.name} alt={config.title} variant={options.shape} className={classes.config} src={config.image} />
      )
    }
  } else if (config.icon) {
    if (config.title) {
      return (
        <Tooltip title={config.title}>
          <Avatar name={props.name} key={config.name} alt={config.title} variant={options.shape} className={classes.avatar} onClick={props.onClick} >
            {getIcon(config.icon)}
          </Avatar>
        </Tooltip>
      )
    } else {
      return (
        <Avatar name={props.name} key={config.name} alt={config.title} variant={options.shape} className={classes.avatar} onClick={props.onClick} >
          {getIcon(config.icon)}
        </Avatar>
      )
    }
  } else {
    if (config_text.length > 1) { config_text = config_text.charAt(1).toLocaleUpperCase(); }
    return (
      <Tooltip title={config.title}>
        <Avatar name={config.name} key={config.name} alt={config.title} variant={options.shape} className={classes.avatar} onClick={props.onClick} >
          {config_text}
        </Avatar>
      </Tooltip>
    )
  }
}

class AvatarComponent extends structs.ListBase.ListBase {
  /**
   * Used to manage internal state of avatars
   */

  getData = () => {
    return this.data;
  }

  onAvatarClick = (evt) => {
    if (this.props.config.options.select) {
      let name = evt.target.parentElement.getAttribute("name");
      // click
      // EventManager.getInstance().addEvent(name, 'selected', this.props.data || {}, evt);
      this.setSelectedId(name);
    }
  }

  render() {
    // if (!this.props.data){ return null; }

    // merge items with config
    const onAvatarClick = this.props.onAvatarClick || this.onAvatarClick;
    let items = this.state.data || [];
    let config = this.props.config || {};

    if (!config.options) { config.options = {}; }
    if (!items) { return null; }
    if (items.length === 1) {
      return (
        <AvatarSingleRender name={items[0].id} key={items[0].id} data={items[0]} config={this.props.config} onClick={onAvatarClick} />
      )
    } else {
      if (!items.map) { return null; }
      if (!config.options) { return null; }

      return (
        <AvatarGroup max={config.options.max_count}>
          {items.map(itm =>
            (<AvatarSingleRender name={itm.id} key={itm.id} data={itm} config={config} onClick={onAvatarClick} />)
          )}
        </AvatarGroup>
      )
    }
  }

}

export default withStyles(style, { withTheme: true })(AvatarComponent);