import React from 'react';
// material ui components
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
// styles
import { withStyles } from '@mui/styles';

import { StateTree, TreeBase, events as baseEvents, triggers as baseTriggers } from './TreeBase'

export const events = baseEvents;
export const triggers = baseTriggers;

export const options = {
  "id": "tree",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Tree options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {
    "multiSelect": {
      "title": "multiSelect",
      "description": "multiSelect",
      "type": "boolean",
      "default": false
    }
  },
  "required": ["multiSelect"]
}

export const config = {

  name: "Tree",
  type: "tree",
  author: "Kjartan Jónsson",
  description: "Tree component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options,
  state: StateTree
}

const style = (theme) => ({
  root: {
    width: '100%'
  },
});

class TreeComponent extends TreeBase {
  /**
   * Used to manage internal state of avatars
   */
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  renderTree(nodes) {
    if (Array.isArray(nodes)) {
      return nodes.map((node) => this.renderTree(node))
    } else {
      return (<TreeItem
        key={nodes.id}
        disabled={nodes.disabled}
        nodeId={nodes.id}
        label={nodes.title}
        onClick={(event) => this.handleSelect(nodes.id, nodes, nodes.id, null)
        }>
        {
          Array.isArray(nodes.children) ? nodes.children.map((node) => this.renderTree(node)) : null
        }
      </TreeItem >)
    }
  }

  showSelected = (id, idx) => {
    // parent implementation to update the visual representation
    return true; // returns true to update state. Else do not update state.
  }

  updateView = function (action, arr, updated, data) {
    // extend by parent
    if (action === 'select') {
      this.setState(data);
    }
    return true;
  };


  render() {
    //const classes = useStyles();

    const selected = [];
    const expanded = [];
    const viewStyle = this.props.config.options;
    const tree = this.getTreeFromList();

    if (this.state.selectedId) {
      selected.push(this.state.selectedId);
      // expanded.push(this.state.selectedId);
    }

    return (
      <TreeView
        ref={this.componentRef}
        // configure
        multiSelect={viewStyle.multiSelect || false}
        // config state
        selected={selected}
        defaultExpanded={expanded}
        // design
        className={style.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {this.renderTree(tree)}
      </TreeView>
    );
  }
}

export default withStyles(style, { withTheme: true })(TreeComponent);
