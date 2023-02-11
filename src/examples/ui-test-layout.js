

const page_landing = {
  data: [{
    'id': 'text_simpleid0',
    'typography': 'heading',
    'text': 'Velkominn'
  }, {
    'id': 'text_simpleid1',
    'typography': 'text',
    'text': 'Hér er aðal siðan'
  }],
  id: 'text_page_landing',
  schema: {},
  type: 'texts',
  config: {
    options: {
    }
  }
}

const page_products = {
  data: [{
    'id': 'text_simpleid0',
    'typography': 'heading',
    'text': 'Vörur'
  }, {
    'id': 'text_simpleid1',
    'typography': 'text',
    'text': 'Hér er vörur'
  }],
  id: 'text_page_products',
  schema: {},
  type: 'texts',
  config: {
    options: {
    }
  }
}

const page_stores = {
  data: [{
    'id': 'text_simpleid0',
    'typography': 'heading',
    'text': 'Verslanir'
  }, {
    'id': 'text_simpleid1',
    'typography': 'text',
    'text': 'Hér er listi af verslanir'
  }],
  id: 'text_page_stores',
  schema: {},
  type: 'texts',
  config: {
    options: {
    }
  }
}

const page_about = {
  data: [{
    'id': 'text_simpleid0',
    'typography': 'heading',
    'text': 'Um okkur'
  }, {
    'id': 'text_simpleid1',
    'typography': 'text',
    'text': 'Hér er texti um okkur'
  }],
  id: 'text_page_about',
  schema: {},
  type: 'texts',
  config: {
    options: {
    }
  }
}

const page_matchrest = {
  data: [{
    'id': 'text_simpleid0',
    'typography': 'heading',
    'text': 'Siðan fannst ekki'
  }, {
    'id': 'text_simpleid1',
    'typography': 'text',
    'text': '404'
  }],
  id: 'text_page_matchrest',
  schema: {},
  type: 'texts',
  config: {
    options: {
    }
  }
}

export const main_top_menu = {
  data: [{
    'id': 'home',
    'title': 'Home',
    'content': page_landing
  }, {
    'id': 'products',
    'title': 'Vörur og þjónusta',
    'content': page_products
  }, {
    'id': 'stores',
    'title': 'Verslanir',
    'content': page_stores
  }, {
    'id': 'about',
    'title': 'Um okkur',
    'content': page_about
  }, {
    'id': 'not_found',
    'title': 'Siðan fannst ekki',
    'content': page_matchrest
  }],
  id: 'main_top_menu_id',
  schema: {},
  type: 'menu',
  config: {
    options: {
      initial: "stores",
      not_found: "not_found",
      variant: "top"
    }
  }
}

///////////////////////////////////////////////// show friends list - ends

export const layout = {
  'root': [
    main_top_menu
  ]
};


////////////////////////////////////////////////////////////////
// Dialogs
////////////////////////////////////////////////////////////////

export const dialogs = []