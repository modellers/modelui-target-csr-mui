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
    "initial": {
      "title": "Initial",
      "description": "The initial display page is shown when no path is given",
      "type": "string"
    },
    "not_found": {
      "title": "Not found",
      "description": "The name of the page that is displayed if page is not found. This page is not rendered in menu",
      "type": "string"
    }
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

function ContentLayout({ parent, page_not_found, data }) {
  return (
    <div>
      <nav>
        <ul>
          {
            data.map((itm, idx) => {
              const url = itm.id;
              if ((page_not_found !== itm.id) && (itm.unlisted !== true)) {
                return (<li><Link to={url}>{itm.title}</Link></li>)
              }
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

  renderPageContent = function (item, landing, parent, page_not_found, manager) {
    const element = this.renderElementContent(item.content, manager);
    const path = parent + (item.path || item.id)
    if (landing === item.id) { // return both as index and with path if this is the landing page
      return (
        <React.Fragment>
          <Route key={item.id + "idx"} index element={element} />
          <Route key={item.id} path={path} index element={element} />
        </React.Fragment>
      )
    } else if (page_not_found === item.id) {
      return (<Route key={item.id} path="*" element={element} />)
    } else {
      return (<Route key={item.id} path={path} element={element} />)
    }
  }

  render() {
    const manager = this.props.manager;
    const page_not_found = this.props.config.options.not_found;
    let landing = this.props.config.options.initial;
    let parent = "/"

    if ((!landing) && (this.state.data.length)) { landing = this.state.data[0].id; } // select default landing page if not set

    return (
      <Routes>
        <Route element={<ContentLayout parent={this.props.config.options.parent} page_not_found={page_not_found} data={this.state.data} />} >
          {
            this.state.data.map((itm, idx) => {
              return (this.renderPageContent(itm, landing, parent, page_not_found, manager))
            })
          }
        </Route>
      </Routes>
    )
  }

}

export default MenuComponent;
