import React from 'react';

// test utils
import { createEventTriggers, createWatchList, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import { registerText } from '../Text/Text';
import { Dialog } from './Modal';
import { triggers, events, config } from './DialogComponent'

import registerComponents from '../Components';

/// Event addon
export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

export const Basic = (args) => {
  const test_handler = 'dialog_component_test';
  const component_id = 'basic_dialog_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers)}
      <Dialog
        id={component_id}
        data={{
          title: "Lorem Ipsum",
          description: "In ut molestie elit, ac elementum lorem. Etiam nec lacus at nisl tempus pellentesque. Suspendisse euismod mauris et ipsum malesuada, varius fermentum lorem posuere. Suspendisse a elementum enim. Pellentesque bibendum eros ac est interdum cursus. Phasellus sit amet odio et justo cursus egestas eu et leo. Sed et auctor lacus. Nam gravida lacus vitae feugiat blandit. Phasellus eu tortor suscipit, lobortis lacus sed, blandit lorem. Proin ut diam vel magna tristique rutrum nec nec ex. Curabitur nec mauris mi. Sed pulvinar eros nec lectus semper, id accumsan felis ullamcorper.",
          label: "Neque"
        }}
        config={{ options: args, layout: [] }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
Basic.args = {
  modalType: 'confirm'
}

export const FormatedText = (args) => {
  const test_handler = 'formatedtext_component_test';
  const component_id = 'formatedtext_dialog_id';

  registerText();

  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers)}
      <Dialog
        id={component_id}
        data={{
          title: "Lorem Ipsum",
          description: "In ut molestie elit, ac elementum lorem. Etiam nec lacus at nisl tempus pellentesque. Suspendisse euismod mauris et ipsum malesuada, varius fermentum lorem posuere. Suspendisse a elementum enim. Pellentesque bibendum eros ac est interdum cursus. Phasellus sit amet odio et justo cursus egestas eu et leo. Sed et auctor lacus. Nam gravida lacus vitae feugiat blandit. Phasellus eu tortor suscipit, lobortis lacus sed, blandit lorem. Proin ut diam vel magna tristique rutrum nec nec ex. Curabitur nec mauris mi. Sed pulvinar eros nec lectus semper, id accumsan felis ullamcorper.",
          label: "Neque",
          content: {
            data: [
              {
                id: 'Add something to do bellow',
                text: 'Here is a table of items',
                typography: 'text'
              }
            ],
            id: 'inventory-table-description',
            schema: {},
            type: 'text',
            config: {
              options: {}
            }
          }
        }
        }
        config={{ options: args, layout: [] }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
FormatedText.args = {}

//////////////////////////////////////////////////////////////////////////////////

const DialogWithList_AvatarList = {
  data: [{
    'id': 'listid1',
    'title': 'Kitchen things',
    'subtitle': 'Kjartan Akil Jónsson',
    'avatar': {
      'id': 'list-avatar-selected',
      'config': { 'options': {} },
      'data': [{
        'id': 'listid1-avatar-click',
        'title': 'This is the avatar image, does not emit events',
        'image': 'http://d24b33.medialib.edu.glogster.com/avatars/users/1/1/70/99/1709937.png?v=1297145784'
      }]
    },
    'secondary': {
      data: [{
        id: 'listid1-show',
        icon: 'font-awesome:fa fa-eye-slash'
      }, {
        id: 'listid1-share',
        icon: 'font-awesome:fa fa-share'
      }, {
        id: 'listid1-delete',
        icon: 'font-awesome:fa fa-trash'
      }],
      id: 'list-secondary-actions',
      schema: {},
      type: 'buttons',
      config: {
        options: {
          buttonVariant: 'contained',
          size: 'small',
          color: 'secondary'
        }
      }
    }
  }, {
    'id': 'listid2',
    'title': 'R&D for projects',
    'subtitle': 'Kjartan Akil Jónsson',
    'avatar': {
      'id': 'list-avatar-selected',
      'config': { 'options': {} },
      'data': [{
        'id': 'listid2-avatar-click',
        'title': 'This is the avatar image, does not emit events',
        'image': 'http://d24b33.medialib.edu.glogster.com/avatars/users/1/1/70/99/1709937.png?v=1297145784'
      }]
    },
    'secondary': {
      data: [{
        id: 'listid2-show',
        icon: 'font-awesome:fa fa-eye-slash'
      }, {
        id: 'listid2-share',
        icon: 'font-awesome:fa fa-share'
      }, {
        id: 'listid2-delete',
        icon: 'font-awesome:fa fa-trash'
      }],
      id: 'list-secondary-actions',
      schema: {},
      type: 'buttons',
      config: {
        options: {
          buttonVariant: 'contained',
          size: 'small',
          color: 'secondary'
        }
      }
    }
  }, {
    'id': 'listid3',
    'title': 'Toys and fun',
    'subtitle': 'Amíra Mist Kjartansdóttir',
    'avatar': {
      'id': 'list-avatar-selected',
      'config': { 'options': {} },
      'data': [{
        'id': 'listid3-avatar-click',
        'title': 'This is the avatar image, does not emit events',
        'image': 'https://mybluerobot.com/wp-content/plugins/svg-avatars-generator/data/custom-img/girl.png'
      }]
    },
    'secondary': {
      data: [{
        id: 'listid3-show',
        icon: 'font-awesome:fa fa-eye-slash'
      }, {
        id: 'listid3-share',
        icon: 'font-awesome:fa fa-share'
      }, {
        id: 'listid3-delete',
        icon: 'font-awesome:fa fa-trash'
      }],
      id: 'list-secondary-actions',
      schema: {},
      type: 'buttons',
      config: {
        options: {
          buttonVariant: 'contained',
          size: 'small',
          color: 'secondary'
        }
      }
    }
  }, {
    'id': 'listid4',
    'title': 'Toys and fun',
    'subtitle': 'Amíra Mist Kjartansdóttir',
    'avatar': {
      'id': 'list-avatar-selected',
      'config': { 'options': {} },
      'data': [{
        'id': 'listid4-avatar-click',
        'title': 'This is the avatar image, does not emit events',
        'image': 'https://mybluerobot.com/wp-content/plugins/svg-avatars-generator/data/custom-img/girl.png'
      }]
    },
    'secondary': {
      data: [{
        id: 'listid4-show',
        icon: 'font-awesome:fa fa-eye-slash'
      }, {
        id: 'listid4-share',
        icon: 'font-awesome:fa fa-share'
      }, {
        id: 'listid4-delete',
        icon: 'font-awesome:fa fa-trash'
      }],
      id: 'list-secondary-actions',
      schema: {},
      type: 'buttons',
      config: {
        options: {
          buttonVariant: 'contained',
          size: 'small',
          color: 'secondary'
        }
      }
    }
  }, {
    'id': 'listid5',
    'title': 'Clothes',
    'subtitle': 'Amíra Mist Kjartansdóttir',
    'avatar': {
      'id': 'list-avatar-selected',
      'config': { 'options': {} },
      'data': [{
        'id': 'listid4-avatar-click',
        'title': 'This is the avatar image, does not emit events',
        'image': 'https://mybluerobot.com/wp-content/plugins/svg-avatars-generator/data/custom-img/girl.png'
      }]
    },
    'secondary': {
      data: [{
        id: 'listid5-show',
        icon: 'font-awesome:fa fa-eye-slash'
      }, {
        id: 'listid5-share',
        icon: 'font-awesome:fa fa-share'
      }, {
        id: 'listid5-delete',
        icon: 'font-awesome:fa fa-trash'
      }],
      id: 'list-secondary-actions',
      schema: {},
      type: 'buttons',
      config: {
        options: {
          buttonVariant: 'contained',
          size: 'small',
          color: 'secondary'
        }
      }
    }
  }, {
    'id': 'listid6',
    'title': 'Kitchen Things',
    'subtitle': 'Themina Kjartansson',
    'avatar': {
      'id': 'list-avatar-selected',
      'config': { 'options': {} },
      'data': [{
        'id': 'listid4-avatar-click',
        'title': 'This is the avatar image, does not emit events',
        'image': 'https://mybluerobot.com/wp-content/plugins/svg-avatars-generator/data/custom-img/girl.png'
      }]
    },
    'secondary': {
      data: [{
        id: 'listid6-show',
        icon: 'font-awesome:fa fa-eye-slash'
      }, {
        id: 'listid6-share',
        icon: 'font-awesome:fa fa-share'
      }, {
        id: 'listid6-delete',
        icon: 'font-awesome:fa fa-trash'
      }],
      id: 'list-secondary-actions',
      schema: {},
      type: 'buttons',
      config: {
        options: {
          buttonVariant: 'contained',
          size: 'small',
          color: 'secondary'
        }
      }
    }
  }],
  id: 'DialogWithList_AvatarList',
  schema: {},
  type: 'list',
  config: {
    options: {}
  }
}

const DialogWithList_AvatarNameAdd = {
  data: [
    {
    }
  ],
  id: 'DialogWithList_AvatarNameAdd_item',
  schema: {},
  type: 'textfield',
  config: {
    options: { placeholder: "Create new avatar name" }
  }
}

const DialogWithList_AvatarButtonAdd = {
  data: [{
    'id': 'DialogWithList_AvatarButtonAddid',
    'title': 'Add Avatar',
    'disabled': false,
    'icon': 'font-awesome:fa fa-plus'
  }],
  id: 'DialogWithList_AvatarNameAdd_item',
  schema: {},
  type: 'buttons',
  config: {
    options: { color: 'primary' }
  }
}

const DialogWithList_AvatarAddGrid = {
  data: [{
    'gridXS': 9,
    'gridSM': 9,
    'id': 'DialogWithList_AvatarNameAdd',
    'content': DialogWithList_AvatarNameAdd
  }, {
    'gridXS': 3,
    'gridSM': 3,
    'id': 'DialogWithList_AvatarButtonAdd',
    'content': DialogWithList_AvatarButtonAdd
  }],
  id: 'DialogWithList_Grid',
  schema: {},
  type: 'grid',
  config: {
    options: {
      spacing: 1,
      direction: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
    }
  }
}


const DialogWithList_Grid = {
  data: [{
    'id': 'DialogWithList_AvatarNameAdd',
    'content': DialogWithList_AvatarAddGrid
  }, {
    'id': 'DialogWithList_AvatarList',
    'content': DialogWithList_AvatarList
  }],
  id: 'DialogWithList_Grid',
  schema: {},
  type: 'grid',
  config: {
    options: {
      spacing: 1,
      direction: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      gridXS: 12,
      gridSM: 12
    }
  }
}

export const DialogWithList = (args) => {
  const test_handler = 'formatedtext_component_test';
  const component_id = 'formatedtext_dialog_id';

  registerComponents();

  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers)}
      <Dialog
        id={component_id}
        data={{
          title: "Advanced list",
          description: "In ut molestie elit, ac elementum lorem. Etiam nec lacus at nisl tempus pellentesque. Suspendisse euismod mauris et ipsum malesuada, varius fermentum lorem posuere. Suspendisse a elementum enim. Pellentesque bibendum eros ac est interdum cursus. ",
          label: "Done",
          content: DialogWithList_Grid // DialogWithList_Text
        }
        }
        config={{ options: args, layout: [] }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
DialogWithList.args = {}