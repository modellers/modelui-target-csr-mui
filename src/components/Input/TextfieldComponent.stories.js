import React from 'react';

// test utils
import { util } from 'modelui-core-runtime'
import { layout } from 'modelui-core-runtime';
import { action } from '@storybook/addon-actions'
import registerComponents from '../Components';

// components
import TextfieldComponent from './TextfieldComponent';
import { triggers, events, config } from './TextfieldComponent'


/// Event addon
export default {
  title: 'Components/Textfield',
  component: TextfieldComponent,
  argTypes: util.StoryUtil.createLayoutViewArgumentTypes(config)
};

export const TextfieldBasic = (args) => {

  const props = {
    id: 'TextfieldBasic_id',
    type: 'textfield',
    data: {
      'value': 'John Doe'
    },
    config: { options: args },
    schema: {
      type: 'object',
      properties: {
        value: { type: 'string' }
      }
    }
  }

  return (
    <div>
      {util.StoryUtil.prepStoryComponent(
        layout.Manager.ComponentManager.getInstance(), action, registerComponents,
        props, triggers, events,
        { triggers: { populate: { value: "My new populated value" } } }
      )}
      <TextfieldComponent {...props} />
    </div>
  );
};

TextfieldBasic.args = {
}
