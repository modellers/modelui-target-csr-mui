

export const editor_layout = {
  data: [{
    'gridXS': 5,
    'gridSM': 5,
    'hidden': false,
    'id': 'panel_target_id',
    'content': "panel_target_tabs"
  }, {
    'gridXS': 2,
    'gridSM': 2,
    'hidden': false,
    'id': 'panel_tree_id',
    'content': "panel_tree_tabs"
  }, {
    'gridXS': 5,
    'gridSM': 5,
    'hidden': false,
    'id': 'panel_workspace_id',
    'content': "panel_workspace_tabs"
  }],
  id: 'f92ec0aa31e145679d3a7d81a862c5b055f88946',
  schema: {},
  type: 'grid-columns',
  config: {
    options: {
      spacing: 1,
      alignItems: 'stretch',
      gridSM: 2,
      gridXS: 2,
      justifyContent: "center",

    }
  }
}

///////////////////////////////////////////////// show friends list - ends

export const layout = {
  'root': [
    editor_layout
  ]
};


////////////////////////////////////////////////////////////////
// Dialogs
////////////////////////////////////////////////////////////////

export const dialogs = []