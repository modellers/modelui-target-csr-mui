import React from 'react';

// test utils
import { createEventTriggers, createWatchList, createLayoutViewArgumentTypes } from '../../test/utils/StoryUtil'

// components
import { Snackbar } from './Menu';
import SnackbarComponent, { triggers, events, config } from './SnackbarComponent'


/// Event addon
export default {
  title: 'Components/Snackbar',
  component: Snackbar,
  argTypes: createLayoutViewArgumentTypes(config)
};

export const Basic = (args) => {
  const test_handler = 'MenuSnackbar_test';
  const component_id = 'basicmSnackbar1_id';
  const component_inst = (
    <div>
      {createEventTriggers(component_id, triggers, {
        open: {

        }
      })}
      <SnackbarComponent
        id={component_id}
        data={[]}
        config={{ options: args }}
        schema={{}}
      />
    </div>
  );

  createWatchList(test_handler, component_id, Object.keys(events()));

  return component_inst;
};
Basic.args = {
  severity: config.options.severity.default,
  duration: config.options.duration.default,
  vertical: config.options.vertical.default,
  horizontal: config.options.horizontal.default,
}