import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import { Dropdown } from './List';
import { triggers, events, config } from './DropdownComponent'


/// Event addon

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

export const Autocomplete = (args) => {

  const props = {
    id: 'Autocomplete_id',
    type: 'dropdown',
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
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Dropdown {...props} />
    </div>
  );
};
Autocomplete.args = {
  label: 'Your options',
  variant: 'outlined'
}