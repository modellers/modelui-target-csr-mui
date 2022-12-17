
const person_schema = {
  "id": "person",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Person",
  "type": "object",
  "properties": {
    "id": {
      "readOnly": true, // may edit
      "writeOnly": true, // value is showable and exists
      "type": "string"
    },
    "name": {
      "title": "Person name",
      "type": "string"
    }
  },
  "required": ["id", "name"],
}

export const table_in_column = {
  id: '6f7ed12aaab9064442eab644d23dc1499bb2465T',
  schema: {}, // person_schema,
  type: 'table',
  config: {
    options: {}
  },
  data: [
    /*
    {
    'id': 'id1',
    'title': 'John Doe',
  }, {
    'id': 'id2',
    'title': 'Jane Doe',
  }
  */
  ],
}

export const buttons_in_column = {
  id: '6f7ed12aaab9064442eab644d23dc1499bb2465K',
  schema: {},
  type: 'buttons',
  config: {
    options: {
      buttonVariant: 'contained',
      size: 'medium',
      color: 'primary'
    }
  },
  data: [{
    'id': '6f7ed12aaab9064442eab644d23dc1499bb2465L',
    'icon': 'font-awesome:fa fa-heart-o',
    'disabled': false,
    'title': 'Button'
  }, {
    'id': '6f7ed12aaab9064442eab644d23dc1499bb2465M',
    'icon': 'font-awesome:fa fa-heart-o',
    'disabled': false,
    'title': 'Button'
  }],
}

export const two_columns_grid = {
  id: 'f92ec0aa31e145679d3a7d81a862c5b055f88946',
  schema: {},
  type: 'grid',
  config: {
    options: {
      spacing: 1,
      direction: 'row',
      alignItems: 'stretch',
      gridSM: 2,
      gridXS: 2,
      justifyContent: "center",
    }
  },
  data: [{
    'id': '6f7ed12aaab9064442eab644d23dc1499bb2465d',
    'gridXS': 4,
    'gridSM': 4,
    'hidden': false,
    'content': table_in_column
  }, {
    'id': '6f7ed12aaab9064442eab644d23dc1499bb2465f',
    'gridXS': 4,
    'gridSM': 4,
    'hidden': false,
    'content': buttons_in_column
  }],
}

export const two_columns_view = {
  data: [two_columns_grid],
  id: '299a7b04670b9da7216e7162ced77938b9b2e57d',
  schema: {},
  type: 'view',
  config: {
    options: {
    }
  }
}

export const two_columns = {
  'root': [
    two_columns_view
  ]
};

export const layout = two_columns;
export const dialogs = [];

//////////////////////////////////////////////////////////////
/// Tree



export const tree_test = {
  "count": 9,
  "items": [
    {
      "id": "layout",
      "title": "Layout",
      "type": "layout",
      "expanded": true,
      "parent": null,
      "drop": {
        "allow": [
          "component_bin",
          "views",
          "dialogs"
        ]
      }
    },
    {
      "id": "component_bin",
      "title": "Hidden and not used",
      "type": "component_bin",
      "expanded": true,
      "parent": "layout",
      "drop": {
        "allow": [
          "component"
        ]
      }
    },
    {
      "id": "views",
      "title": "Views",
      "type": "views",
      "expanded": true,
      "parent": "layout",
      "drop": {
        "allow": [
          "view"
        ]
      }
    },
    {
      "id": "299a7b04670b9da7216e7162ced77938b9b2e57d",
      "title": "View",
      "type": "view",
      "expanded": true,
      "parent": "views",
      "drop": {
        "types": [
          "views"
        ]
      }
    },
    {
      "id": "f92ec0aa31e145679d3a7d81a862c5b055f88946",
      "title": "Columns",
      "type": "grid-columns",
      "expanded": true,
      "parent": "299a7b04670b9da7216e7162ced77938b9b2e57d",
      "drop": {
        "types": [
          "view",
          "container"
        ]
      }
    },
    {
      "id": "6f7ed12aaab9064442eab644d23dc1499bb2465d",
      "title": "Column",
      "type": "grid-column",
      "expanded": true,
      "parent": "f92ec0aa31e145679d3a7d81a862c5b055f88946",
      "drop": {
        "types": [
          "grid-columns"
        ]
      }
    },
    {
      "id": "6f7ed12aaab9064442eab644d23dc1499bb2465T",
      "title": "Table",
      "type": "table",
      "expanded": true,
      "parent": "6f7ed12aaab9064442eab644d23dc1499bb2465d",
      "drop": {
        "types": [
          "grid-column"
        ]
      }
    },
    {
      "id": "6f7ed12aaab9064442eab644d23dc1499bb2465f",
      "title": "Column",
      "type": "grid-column",
      "expanded": true,
      "parent": "f92ec0aa31e145679d3a7d81a862c5b055f88946",
      "drop": {
        "types": [
          "grid-columns"
        ]
      }
    },
    {
      "id": "6f7ed12aaab9064442eab644d23dc1499bb2465K",
      "title": "Buttons",
      "type": "buttons",
      "expanded": true,
      "parent": "6f7ed12aaab9064442eab644d23dc1499bb2465f",
      "drop": {
        "types": [
          "grid-column"
        ]
      }
    },
    {
      "id": "6f7ed12aaab9064442eab644d23dc1499bb2465L",
      "title": "Button",
      "type": "button",
      "expanded": true,
      "parent": "6f7ed12aaab9064442eab644d23dc1499bb2465K",
      "drop": {
        "types": [
          "buttons"
        ]
      }
    },
    {
      "id": "6f7ed12aaab9064442eab644d23dc1499bb2465M",
      "title": "Button",
      "type": "button",
      "expanded": true,
      "parent": "6f7ed12aaab9064442eab644d23dc1499bb2465K",
      "drop": {
        "types": [
          "buttons"
        ]
      }
    },
    {
      "id": "dialogs",
      "title": "Dialogs",
      "type": "dialogs",
      "expanded": true,
      "parent": "layout",
      "drop": {
        "allow": [
          "dialog"
        ]
      }
    },
    {
      "id": "data",
      "title": "Data",
      "type": "data",
      "expanded": true,
      "disabled": true,
      "parent": null,
      "drop": {
        "allow": [
          "collection"
        ]
      }
    },
    {
      "id": "transform",
      "title": "Transforms",
      "type": "transform",
      "expanded": true,
      "disabled": true,
      "parent": null,
      "drop": {
        "allow": [
          "transform"
        ]
      }
    }
  ]
}


//////////////////////////////////////////////////////////////
/// Testing buildLayoutData

export const build_data_test1_events = [
  {
    "component": { "id": "16c7dc9cf1b8239084221605776f2633ce6dec64", "event": "replacing" },
    "trigger": { "id": "53f3305e201830f18e7fb081913b77aa990f39af", "action": "select" },
    "transform": "i=3;\\ni++;asdfasdf \\n12/2\\nreturn data; // SEL always return something unless raising exceptions\\n"
  },
  {
    "component": { "id": "53f3305e201830f18e7fb081913b77aa990f39af", "event": "deleted" },
    "trigger": { "id": "16c7dc9cf1b8239084221605776f2633ce6dec64", "action": "delete" },
    "transform": "return data; // asdfsfptions DEL"
  }
]
export const build_data_test1_datas = { "ee4b54935f88": { "schema": { "$schema": "https://json-schema.org/draft/2020-12/schema", "type": "object", "properties": { "age": { "description": "Age of persion", "type": "number", "title": "Age" }, "name": { "type": "string", "description": "Name of persion", "title": "Name" }, "id": { "type": "string", "title": "Identifier", "description": "Required identifier" } }, "required": ["id"], "title": "Person List", "$id": "https://example.com/schema.json" }, "items": [{ "age": "46", "id": "akil", "name": "Akil" }, { "name": "Amíra", "id": "amira", "age": "9" }], "id": "ee4b54935f88" }, "fffsfsfssfsfsf": { "items": [{ "title": "ssss", "id": "adsf", "col1": "" }, { "id": "some_2", "col1": 32 }, { "col1": 33, "id": "some_1" }, { "col1": "666", "id": "some_3" }, { "id": "some_77", "col1": "erer" }, { "id": "some_66" }], "schema": { "type": "object", "$id": "https://example.com/ffsfsfssffsfs.schema.json", "properties": { "id": { "title": "Identifiers", "type": "string" }, "col1": { "title": "Column 1 val", "type": "integer" } }, "title": "Something else" }, "id": "fffsfsfssfsfsf" }, "7e62ca60eea7": { "items": [{ "id": "the_title_id", "title": "The Title 1" }], "schema": { "$schema": "https://json-schema.org/draft/2020-12/schema", "type": "object", "required": ["id"], "$id": "https://example.com/schema.json", "title": "Entitled List", "properties": { "id": { "type": "string", "title": "Identifier", "description": "Required identifier" }, "title": { "title": "Title", "description": "Optional header identifier", "type": "string" } } }, "id": "7e62ca60eea7" } };
export const build_data_test1_props = {
  // "67477e9ddd0b92b3736c81abaf3aef1b82e1877f": { "id": "67477e9ddd0b92b3736c81abaf3aef1b82e1877f", "config": { "type": "tab", "options": { "icon": "", "disabled": false, "title": "Button" } } }, 
  // "b5d2d7da11fb4c6f462c0523265e288c14699851": { "id": "b5d2d7da11fb4c6f462c0523265e288c14699851", "config": { "type": "tab", "options": { "icon": "", "disabled": false, "title": "Table" } } }, 
  "287c980e0d91f2c6966099435c3195efdf28a875": { "type": "table", "config": { "options": { "size": "medium", "schema": "fffsfsfssfsfsf", "select": false }, "type": "table" }, "id": "287c980e0d91f2c6966099435c3195efdf28a875", "schema": {} },
  // "d1673ca0a37318591b4f2fb738c8e6914e61857a": { "id": "d1673ca0a37318591b4f2fb738c8e6914e61857a", "config": { "options": { "icon": "font-awesome:fa fa-heart-o", "disabled": false, "title": "Button" }, "type": "button" } },
  // "3c225c434ded021940ce2e5226f8021506b981e0": { "config": { "type": "tab", "options": { "icon": "", "disabled": false, "title": "Calendar" } }, "id": "3c225c434ded021940ce2e5226f8021506b981e0" },
  "16c7dc9cf1b8239084221605776f2633ce6dec64": { "config": { "options": { "views": "work_week", "config": "month", "selectable": true }, "type": "calendar-big" }, "schema": {}, "type": "calendar-big", "id": "16c7dc9cf1b8239084221605776f2633ce6dec64" }
  // "53f3305e201830f18e7fb081913b77aa990f39af": { "type": "buttons", "schema": {}, "id": "53f3305e201830f18e7fb081913b77aa990f39af", "config": { "type": "buttons", "options": { "color": "primary", "buttonVariant": "contained", "size": "medium" } } },
  // "c8e22aeddb01a0150f5ccd44369a913b01ce8735": { "config": { "options": { "indicatorColor": "secondary", "tabVariant": "standard", "textColor": "inherit", "contentMargin": 1 }, "type": "tabs" }, "id": "c8e22aeddb01a0150f5ccd44369a913b01ce8735", "type": "tabs", "schema": {} } 
}

