/**
 * https://mui.com/material-ui/getting-started/templates/
 */


import React from 'react';
// react-router
import { Routes, Route, Outlet, Link } from 'react-router-dom';
// material ui components
import { structs } from 'modelui-core-runtime';
// rendering
import RenderListMenu from './RenderListMenu';

export const events = structs.ListBase.events;
export const triggers = structs.ListBase.triggers;

export const options = {
  "id": "menu-tab",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Menu options. Supports 2 level menu",
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
    },
    /* NOT NEEDED SINCE WE SOLVE THE PLACEMENT OF DUAL NODES BY SETTING PARENT NAME (Example: placing top menu left buttons, we set parent name to '__primary__', '__secondary__')
    "behavoiur": {
      "title": "Group",
      "description": "Rules depends on menu type", // if parent_top
      "type": "string"
    },
    "rules": {
      "title": "Behavour Rule", // for heading-sidebar we use this rule to see what groups we place in top
      "description": "",
      "type": "string"
    },*/
    "search": {
      "title": "Search", // for heading-sidebar we use this rule to see what groups we place in top
      "description": "Search specified datasource",
      "type": "string"
    },
    "label_group": {
      "title": "Group labelings", // for heading-sidebar we use this rule to see what groups we place in top
      "description": "If true we will render the menu items within grouped titles",
      "type": "boolean"
    },
    "badge_position": {
      "title": "Badge Position", // for heading-sidebar we use this rule to see what groups we place in top
      "description": "Placement of the badges",
      "type": "boolean"
    },
    "parent_titles": {
      "title": "Parent labeling rule",
      "description": "Different rules on how to render the parents. Default they are part of tree. If rule is 'titles', the we try to group the children within titles",
      "type": "string",
      "enum": ["titles", "seperators", "separated-titles"]
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
    "path": {
      "description": "Path is used instead of identifier if set",
      "type": "string"
    },
    "icon": {
      "description": "Icon",
      "type": "string"
    },
    "description": {
      "description": "Description",
      "type": "string",
      "default": ""
    },
    "parent": {
      "description": "Groups items into parents",
      "type": "string",
      "default": ""
    },
    "badge": {
      "description": "Group",
      "type": "string",
      "default": ""
    }
  },
  "required": ["title", "icon", "parent"]
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
  return <RenderListMenu parent={parent} page_not_found={page_not_found} data={data} position={'left'} />
  /*
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
  */
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
    if (item.content){
      const element = this.renderElementContent(item.content, manager);
      const path = parent + (item.path || item.id)
      if (landing === item.id) { // return both as index and with path if this is the landing page
        return (
          <React.Fragment key={"fragment-" + item.id}>
            <Route key={item.id + "idx"} index element={element} />
            <Route key={item.id} path={path} index element={element} />
          </React.Fragment>
        )
      } else if (page_not_found === item.id) {
        return (<Route key={item.id} path="*" element={element} />)
      } else {
        return (<Route key={item.id} path={path} element={element} />)
      }
    }else {
      return null;
    }
  }

  render() {
    const manager = this.props.manager;
    const page_not_found = this.props.config.options.not_found;
    let landing = this.props.config.options.initial;
    let parent = "/"

    if ((!landing) && (this.state.data.length)) { landing = this.state.data[0].id; } // select default landing page if not set

    return (
      <Routes key={"routes-" + this.props.id}>
        <Route key={"route-" + this.props.id} element={<ContentLayout parent={this.props.config.options.parent} page_not_found={page_not_found} data={this.state.data} />} >
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
