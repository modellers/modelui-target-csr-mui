import React from 'react';
import ComponentManager from './Manager'


export function LayoutRender(container_id, data, classes, config, wrapper = 'div', ignore = []) {
  let content = []; // rendered content
  console.info("-----------FIXME: TODO: IS THIS CODE USED?-----------");
  for (let item of config.layout) {
    if (!item) { continue; }
    // check if we should skip generating this item by request of the caller. Example dont allow card action to have another card
    if (ignore.indexOf(item.type) > -1) { console.warn('Using item type=' + item.type + ' not supported in layout for ' + container_id); continue; }
    // create a component identifier
    let id = container_id + (item.id || item.type);

    // build the component
    if (item.type === 'layout') {
      content.push(<Layouter id={id} key={id} classes={classes} data={data} config={item.config} />)
    } else {
      const item_data = data || {};
      const params = { id: id, key: id, classes: classes, data: item.data || item_data[item.pick] || item_data, config: item.config };
      const component = ComponentManager.getInstance().getComponentInstance(item.type, params);
      if (component) {
        content.push(component)
      } else {
        // TODO: notify missing component with type
      }
    }
  }
  return <div>{content}</div>;
}

export default function Layouter(props) {
  // style
  const classes = {};
  // recursive render
  return LayoutRender(props.id, props.data, classes, props.config, 'div');
}