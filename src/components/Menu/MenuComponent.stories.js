import React from 'react';

// test utils
import { prepStoryComponent } from '../../util/StoryUtil';
import { util } from 'modelui-core-runtime'
import { layout } from 'modelui-core-runtime';
import { action } from '@storybook/addon-actions'
import registerComponents from '../Components';
import { ApplicationWrapper } from '../../theme/components';

// components
import { List } from './List';
import { triggers, events, config } from './MenuComponent'
/// Event addon
export default {
  title: 'Components/List',
  component: List,
  argTypes: util.StoryUtil.createLayoutViewArgumentTypes(config)
};

export const Basic = (args) => {

  const props = {
    id: 'ListBasic_id',
    type: 'list',
    data: [{
      'id': 'id1',
      'title': 'title 1',
    }, {
      'id': 'id2',
      'title': 'title 2',
    }, {
      'id': 'select_value',
      'title': 'select_value',
    }, {
      'id': 'delete_value',
      'title': 'delete_value',
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <ApplicationWrapper>
      {prepStoryComponent(
        layout.Manager.ComponentManager.getInstance(), action, registerComponents,
        props, triggers, events)}
      <List  {...props} />
    </ApplicationWrapper>
  );
};
Basic.args = {
  select: false
}

export const BasicSubtitle = (args) => {

  const props = {
    id: 'ListBasicSubtitle_id',
    type: 'list',
    data: [{
      'id': 'id1',
      'title': 'title 1',
      'subtitle': 'sub title 1',
    }, {
      'id': 'id2',
      'title': 'title 2',
      'subtitle': 'sub title 2',
    }, {
      'id': 'select_value',
      'title': 'select_value',
      'subtitle': 'sub select_value',
    }, {
      'id': 'delete_value',
      'title': 'delete_value',
      'subtitle': 'sub delete_value',
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <ApplicationWrapper>
      {prepStoryComponent(
        layout.Manager.ComponentManager.getInstance(), action, registerComponents,
        props, triggers, events)}
      <List  {...props} />
    </ApplicationWrapper>
  );
};
BasicSubtitle.args = {}


export const BasicAvatar = (args) => {

  const props = {
    id: 'BasicAvatar_id',
    type: 'list',
    data: [{
      'id': 'id1',
      'title': 'Amira Mist',
      'subtitle': 'Birthay is 29 of january',
      'avatar': {
        'id': 'id1avatars',
        'config': { 'options': {} },
        'data': [{
          'id': 'id1',
          'title': 'Profile picture of Amíra',
          'image': 'https://mybluerobot.com/wp-content/plugins/svg-avatars-generator/data/custom-img/girl.png'
        }]
      }
    }, {
      'id': 'id2',
      'title': 'Kjartan Akil',
      'subtitle': 'Birthay is 20 of september',
      'avatar': {
        'id': 'id1avatars',
        'config': { 'options': {} },
        'data': [{
          'id': 'id1',
          'title': 'Profile picture of Akil',
          'image': 'http://d24b33.medialib.edu.glogster.com/avatars/users/1/1/70/99/1709937.png?v=1297145784'
        }]
      }
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <ApplicationWrapper>
      {prepStoryComponent(
        layout.Manager.ComponentManager.getInstance(), action, registerComponents,
        props, triggers, events)}
      <List  {...props} />
    </ApplicationWrapper>
  );
};
BasicAvatar.args = {}


export const SecondaryButton = (args) => {

  const props = {
    id: 'ListBasic_id',
    type: 'list',
    data: [{
      'id': 'id1',
      'title': 'Amira Mist',
      'subtitle': 'Birthay is 29 of january',
      'avatar': {
        'id': 'id1avatars',
        'config': { 'options': {} },
        'data': [{
          'id': 'id1',
          'title': 'title 1',
          'image': 'https://mybluerobot.com/wp-content/plugins/svg-avatars-generator/data/custom-img/girl.png'
        }]
      },
      'secondary': {
        data: [{
          id: 'id1secondary_action',
          title: 'Hi!',
        }],
        id: 'inventory-table-description',
        schema: {},
        type: 'buttons',
        config: {
          options: {
            buttonVariant: 'contained',
            size: 'medium',
            color: 'primary'
          }
        }
      }
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <ApplicationWrapper>
      {prepStoryComponent(
        layout.Manager.ComponentManager.getInstance(), action, registerComponents,
        props, triggers, events)}
      <List  {...props} />
    </ApplicationWrapper>
  );
};
SecondaryButton.args = {}

