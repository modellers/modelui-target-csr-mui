import React from 'react';
// react-router
import { Routes, Route, Outlet, Link } from 'react-router-dom';
// material ui components

import { structs } from 'modelui-core-runtime';

export const events = structs.ListBase.events;
export const triggers = structs.ListBase.triggers;

export const options = {
  "id": "menu-tab",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Menu options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "variant": {
      "title": "Variant",
      "description": "Menu variant",
      "type": "string",
      "enum": ["stack", "top", "bottom", "tabs"],
    },
  },
  "required": []
}

export const item = {
  "id": "menu-item",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Menu item",
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
    "icon": {
      "description": "Icon",
      "type": "string"
    },
    "description": {
      "description": "Description",
      "type": "string",
      "default": ""
    }
  },
  "required": ["title"]
}

export const config = {
  name: "TabMenu",
  type: "menu",
  author: "Kjartan Jónsson",
  description: "Menu component",
  version: 0.1,
  relation: {
    contains: ["menu-item"],
    within: "component" // parent
  },
  contains: {
    "menu-item": item
  },
  options: options,
  state: structs.ListBase.StateList
}

function ContentLayout({ data }) {
  return (
    <div>
      <nav>
        <ul>
          {
            data.map((itm, idx) => {
              const url = "/" + itm.id;
              return (<li><Link to={url}>{itm.title}</Link></li>)
            })
          }
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}


class MenuComponent extends structs.ListBase.ListBase {

  constructor(props) {
    super(props);
    /*
    if (props.config.options.variant === 'top') {
      this.MenuView = createMaterialTopTabNavigator();
    } else if (props.config.options.variant === 'bottom') {
      this.MenuView = createMaterialBottomTabNavigator();
    } else if (props.config.options.variant === 'tabs') {
      this.MenuView = createBottomTabNavigator();
    } else { // stack
      this.MenuView = createStackNavigator();
    }
    this.navigation = props.navigation;
    */
  }

  updateView = function (action, arr, updated, data) {
    // extend by parent
    if (action === 'select') {
      // this.setState(data);
      debugger;
    }
    return true;
  };

  renderElementContent = function (content, manager) {
    if (typeof (content) === 'string') {
      return <div>{content}</div>
    } else {
      const params = { id: content.id, key: content.id, classes: {}, data: content.data, config: content.config, manager: manager };
      const component = manager.getComponentInstance(content.type, params);
      return <div>{component}</div>;
    }
  }

  renderPageContent = function (item, landing, manager) {
    const element = this.renderElementContent(item.content, manager);
    if (landing === item.id) { // return both as index and with path if this is the landing page
      return (
        <React.Fragment>
          <Route key={item.id} index element={element} />
          <Route key={item.id} path={item.id} index element={element} />
        </React.Fragment>
      )
    } else {
      return (<Route key={item.id} path={item.id} element={element} />)
    }
  }

  render() {
    const manager = this.props.manager;
    let landing = this.props.config.options.initial;
    if ((!landing) && (this.state.data.length)) { landing = this.state.data[0].id; } // select default landing page if not set
    return (
      <Routes>
        <Route path="/" element={<ContentLayout data={this.state.data} />} >
          {
            this.state.data.map((itm, idx) => {
              return (this.renderPageContent(itm, landing, manager))
            })
          }
        </Route>
      </Routes>
    )
  }

}

export default MenuComponent;
