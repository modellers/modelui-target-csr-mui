import React from 'react';

// test utils
import { util } from 'modelui-core-runtime'
import { layout } from 'modelui-core-runtime';
import { action } from '@storybook/addon-actions'
import registerComponents from '../Components';

// test data
import { TestTextLatin_SummaryArray, TestIconLatin_SummaryArray } from '../../test/data/TestText.js'

// components
import { Tabs } from './Grid';
import { triggers, events, config } from './TabsComponent'


/// Event addon

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: util.StoryUtil.createLayoutViewArgumentTypes(config)
};

export const Basic = (args) => {
  const props = {
    id: 'TabsBasic_id',
    type: 'tabs',
    data: [{
      'id': 'id1',
      'title': 'Title 1',
      'content': 'Some text here 1'
    }, {
      'id': 'id2',
      'title': 'Title 2',
      'content': 'Some text here 2'
    }, {
      'id': 'select_value',
      'title': 'Title 3',
      'content': 'Some text here 3',
      'disabled': true
    }, {
      'id': 'delete_value',
      'title': 'Title 4',
      'content': 'Some text here 4'
    }],
    config: { options: args },
    schema: {}
  }
  return (
    <div>
      {util.StoryUtil.prepStoryComponent(
        layout.Manager.ComponentManager.getInstance(), action, registerComponents,
        props, triggers, events)}
      <Tabs {...props} />
    </div>
  );
};
Basic.args = {
}

export const BasicText = (args) => {

  const props = {
    id: 'BasicText_id',
    type: 'tabs',
    data: TestTextLatin_SummaryArray,
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {util.StoryUtil.prepStoryComponent(
        layout.Manager.ComponentManager.getInstance(), action, registerComponents,
        props, triggers, events)}
      <Tabs {...props} />
    </div>
  );
};
BasicText.args = {
}

export const BasicIcon = (args) => {

  const props = {
    id: 'BasicIcon_id',
    type: 'tabs',
    data: TestIconLatin_SummaryArray,
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {util.StoryUtil.prepStoryComponent(
        layout.Manager.ComponentManager.getInstance(), action, registerComponents,
        props, triggers, events)}
      <Tabs {...props} />
    </div>
  );
};
BasicIcon.args = {
}