import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import { Tree } from './Tree';
import { triggers, events, config } from './TreeComponent'
import { example_generators, example_tree_array_items } from './data';


/// Event addon
export default {
  title: 'Components/Tree',
  component: Tree,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};


export const Basic = (args) => {
  const props = {
    id: 'TreeBasic_id',
    type: 'tree',
    data: example_tree_array_items,
    config: { options: args },
    schema: {}
  }
  return (
    <div>
      {prepStoryComponent(props, triggers, events, { triggers: example_generators })}
      <Tree {...props} />
    </div>
  );
};
Basic.args = {
  multiSelect: config.options.properties.multiSelect.default
}