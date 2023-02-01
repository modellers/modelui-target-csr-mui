import React from 'react';

import { layout } from 'modelui-core-runtime';

export const events = layout.LayoutBase.events;
export const triggers = layout.LayoutBase.triggers;


export const options = {
  "id": "layout",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Layout",
  "description": "Layout options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {},
  "required": []
}

export const config = {
  name: "Layout",
  type: "layout",
  author: "Kjartan Jónsson",
  description: "Layout component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options,
  state: layout.LayoutBase.StateLayout
}

const Layouter = layout.Layout.Layouter;

export default class LayoutComponent extends layout.LayoutBase.LayoutBase {
  /**
   * Used to manage layout
   */

  constructor(props) {
    props.config.options = props.config.options || {};
    super(props);
  }

  render() {
    const { classes } = this.props;
    //return LayoutRender(this.props.id, this.props.data, classes, config, 'div');
    const container_id = this.props.id;
    const data = this.props.data;
    const ignore = [];
    const content = []; // rendered content

    for (let item of this.props.data) {
      // check if we should skip generating this item by request of the caller. Example dont allow card action to have another card
      if (ignore.indexOf(item.type) > -1) { console.warn('Using item type=' + item.type + ' not supported in layout for ' + container_id); continue; }
      // create a component identifier
      let id = item.id;
      // build the component
      if (item.type === 'layout') {
        content.push(<Layouter id={id} key={id} classes={classes} data={data} config={item.config} manager={this.props.manager} />);
      } else {
        const item_data = data || {};
        const params = { id: id, key: id, classes: classes, data: item.data || item_data[item.pick] || item_data, config: item.config, manager: this.props.manager };
        const component = this.props.manager.getComponentInstance(item.type, params);
        if (component) {
          content.push(component)
        } else {
          // TODO: notify missing component with type
        }
      }
    }
    return <div>{content}</div>;
  }
}