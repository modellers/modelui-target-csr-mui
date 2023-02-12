

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

const page_products_text = {
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

const page_product_list = {
  data: [{
    'id': 'page_product_2a',
    'typography': 'heading',
    'text': 'Vörur'
  }, {
    'id': 'page_product_2b',
    'typography': 'text',
    'text': 'Mælum með þessum'
  }],
  id: 'text_page_product_list',
  schema: {},
  type: 'texts',
  config: {
    options: {
    }
  }
}

const page_product_1 = {
  data: [{
    'id': 'page_product_1a',
    'typography': 'heading',
    'text': 'Vara 1'
  }, {
    'id': 'page_product_1b',
    'typography': 'text',
    'text': 'Lysing á vöru 1'
  }],
  id: 'text_page_products_1',
  schema: {},
  type: 'texts',
  config: {
    options: {
    }
  }
}

const page_product_2 = {
  data: [{
    'id': 'page_product_2a',
    'typography': 'heading',
    'text': 'Vara 2'
  }, {
    'id': 'page_product_2b',
    'typography': 'text',
    'text': 'Lysing á vöru 2'
  }],
  id: 'text_page_products_2',
  schema: {},
  type: 'texts',
  config: {
    options: {
    }
  }
}

export const page_products = {
  data: [{
    'id': 'page_product_list',
    'title': 'Products',
    'unlisted': true,
    'content': page_product_list
  }, {
    'id': 'page_product_1_id',
    'title': 'Product 1 title',
    'content': page_product_1
  }, {
    'id': 'page_product_2_id',
    'title': 'Product 2 title',
    'content': page_product_2
  }],
  id: 'page_products_id',
  schema: {},
  type: 'menu',
  config: {
    options: {
      parent: "products",
      initial: "page_product_list",
      variant: "top"
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
    'path': 'products/*',
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
      parent: "/",
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