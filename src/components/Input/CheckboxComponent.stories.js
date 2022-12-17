import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import { Checkbox } from './Input';
import { triggers, events, config } from './CheckboxComponent'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

export const Basic = (args) => {

  const props = {
    id: 'CheckboxBasic_id',
    type: 'checkboxes',
    data: [{
      'id': 'id1',
      'title': 'title 1',
      'selected': true,
    }, {
      'id': 'id2',
      'title': 'title 2',
      'selected': false,
    }, {
      'id': 'select_value',
      'title': 'select_value',
      'selected': false
    }, {
      'id': 'delete_value',
      'title': 'delete_value',
      'selected': true,
      'disabled': true
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Checkbox {...props} />
    </div>
  );
};
Basic.args = {
  direction: 'column',
  color: 'secondary',
  size: 'medium',
  labelPlacement: 'end'
}

export const Icons = (args) => {

  const props = {
    id: 'CheckboxIcon_id',
    type: 'checkboxes',
    data: [{
      'id': 'id1',
      'title': 'title 1',
      'selected': true,
    }, {
      'id': 'id2',
      'title': 'title 2',
      'selected': false,
    }, {
      'id': 'select_value',
      'title': 'select_value',
      'selected': false
    }, {
      'id': 'delete_value',
      'title': 'delete_value',
      'selected': true,
      'disabled': true
    }],
    config: { options: args },
    schema: {}
  }
  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Checkbox {...props} />
    </div>
  );
};
Icons.args = {
  direction: 'row',
  color: 'primary',
  size: 'small',
  iconIsSelected: 'material-ui:AccessAlarms',
  iconUnSelected: 'material-ui:AccessTimeOutlinedIcon',
  labelPlacement: 'bottom'
}
