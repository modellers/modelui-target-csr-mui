import { structs } from 'modelui-core-runtime';

export const events = structs.ListBase.events;
export const triggers = structs.ListBase.triggers;

export const options = {
  "id": "MemoryStorage",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Memory Storage options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {},
  "required": []
}


export const config = {
  name: "Memory Storage",
  type: "memory-storage",
  author: "Kjartan Jónsson",
  description: "Memory storage component used for working with data using list events",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options,
  state: structs.ListBase.StateList
}

export default class MemoryStorage extends structs.ListBase.ListBase {
  /**
   * TODO: this component does not need to extend react Component
   */
  constructor(props) {
    super(props);
    this.eventDD = this.registerComponent({}, {}, config);
  }
}

// this allows objects in array
export const schema = {
  '$id': 'https://example.com/list.schema.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'description': 'List item',
  'type': 'array',
  'type': 'array',
  'items': {
    '$ref': 'memory.storage.item.json'
  }
};

export const item = {
  '$id': 'https://example.com/memory.storage.item.json',
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'description': 'List item',
  'type': 'object',
  'required': ['id'],
  'additionalProperties': true,
  'properties': {
    'id': {
      'type': 'string'
    }
  }
};