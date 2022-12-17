// utils
import { getFlatDataFromTree, getTreeFromFlatData } from './utils'
// base list
import { StateList, ListBase, events as baseEvents, triggers as baseTriggers } from '../../event/ListBase'

const treeTriggers = {
  /*
  expand: {
    alias: [],
    info: {
      name: 'Expand',
      description: 'Adds data at the end to component'
    },
    schema: {}
  },
  collapse: {
    alias: [],
    info: {
      name: 'Collapse',
      description: 'Adds data to the front of the component'
    },
    schema: {}
  }
  */
}

const treeEvents = {
  /*
  expanded: {
    alias: [],
    info: {
      name: 'Expanded',
      description: 'Expanded item'
    },
    schema: {} 
  },
  collapsed: {
    alias: [],
    info: {
      name: 'Collapsed',
      description: 'Collapsed item'
    },
    schema: {}
  }
  */
}

export const events = {
  ...baseEvents, ...treeEvents
}
export const triggers = {
  ...baseTriggers, ...treeTriggers
};

export const StateTree = StateList;

export class TreeBase extends ListBase {

  constructor(props) {
    super(props);
    // add a separate tree state
    this.state.tree = this.getTreeFromList();
  }

  getTreeFromList = (data) => {
    let _data = data;
    if (!_data) { _data = this.state.data; }
    return getTreeFromFlatData({
      flatData: _data,
      getKey: (itm) => { return itm.id; },
      getParentKey: (itm) => { return itm.parent; },
      rootKey: this.props.config.options.rootId || null
    });
  }

  getListFromTree = (tree) => {
    let _tree = tree;
    if (!_tree) { _tree = this.state.tree; }
    const flatData = getFlatDataFromTree({
      treeData: _tree,
      getNodeKey: (itm) => { return itm.id; },
      ignoreCollapsed: false
    });
    const data = [];
    flatData.forEach(item => {
      const itm = { ...item.node };
      if (item.parentNode === null) {
        itm.parent = null; // null;
      } else {
        itm.parent = item.parentNode.id;
      }
      delete itm.children;
      data.push(itm);
    });
    return data;
  }

  getPathToNodeById = (id) => {
    const idx = this.findItemIndexById(id);
    if (idx === null) {
    } else {
      const itm = this.state.data[idx];
      if (itm.parent !== null) {
        return this.getPathToNodeById(itm.parent);
      }
    }
  }

}

export const schema = {
  '$id': 'https://example.com/list.schema.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'description': 'List item',
  'type': 'array',
  'items': {
    '$ref': 'list.item.json'
  }
};

export const item = {
  '$id': 'https://example.com/list.schema.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'description': 'List item',
  'type': 'object',
  'required': ['text'],
  'properties': {
    'text': {
      '$ref': 'list.itemtext.json'
    },
    'avatar': {
      '$ref': 'avatar.schema.json'
    },
    'action': {
      'oneOf': [
        { '$ref': 'button.schema.json' },
        { '$ref': 'list.itemtext.json' },
        // {'$ref': 'form.checkbox.json'}
        // {'$ref': 'form.switch.json'}
      ]
    }
  }
};

export const itemtext = {
  '$id': 'https://example.com/list.itemtext.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'description': 'List item text',
  'type': 'object',
  'properties': {
    'title': {
      'type': 'string'
    },
    'subtitle': {
      'type': 'string'
    }
  }
};
