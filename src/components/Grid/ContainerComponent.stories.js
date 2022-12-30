import React from 'react';

// test utils
import { util } from 'modelui-core-runtime'
import { layout } from 'modelui-core-runtime';
import { action } from '@storybook/addon-actions'
import registerComponents from '../Components';

// test data
import { TestTextLatin_SummaryArray } from '../../test/data/TestText.js'

// components
import { Container } from './Grid';
import { triggers, events, config } from './ContainerComponent'


/// Event addon

export default {
  title: 'Components/Container',
  component: Container,
  argTypes: util.StoryUtil.createLayoutViewArgumentTypes(config)
};

export const Basic = (args) => {

  const props = {
    id: 'ContainerBasic_id',
    type: 'container',
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
      <Container {...props} />
    </div>
  );
};
Basic.args = {
}


export const BasicText = (args) => {


  const props = {
    id: 'ContainerBasicText_id',
    type: 'container',
    data: TestTextLatin_SummaryArray,
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {util.StoryUtil.prepStoryComponent(
        layout.Manager.ComponentManager.getInstance(), action, registerComponents,
        props, triggers, events)}
      <Container {...props} />
    </div>
  );
};
BasicText.args = {
}
