import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import TextfieldComponent from './TextfieldComponent';
import { triggers, events, config } from './TextfieldComponent'


/// Event addon
export default {
  title: 'Components/Textfield',
  component: TextfieldComponent,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
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
      {prepStoryComponent(
        props, triggers, events,
        { triggers: { populate: { value: "My new populated value" } } }
      )}
      <TextfieldComponent {...props} />
    </div>
  );
};

TextfieldBasic.args = {
}
