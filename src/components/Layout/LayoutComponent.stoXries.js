import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'
// components
import { Layout } from './Grid';
import { triggers, events, config } from './LayoutComponent'

const text_section = [
  {
    id: 'text-layout-testA',
    type: 'texts',
    data: [
      {
        'id': 'idA0',
        'typography': 'title',
        'text': 'Lorem ipsum dolor'
      }, {
        'id': 'idA1',
        'typography': 'text',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel.'
      }
    ],
    config: {
      style: {},
      layout: []
    }
  }, {
    id: 'text-layout-testB',
    type: 'texts',
    data: [
      {
        'id': 'idB0',
        'typography': 'title',
        'text': 'Phasellus gravida'
      }, {
        'id': 'idB1',
        'typography': 'text',
        'text': 'Morbi facilisis orci dolor, tristique imperdiet justo interdum tincidunt. Aliquam luctus leo vitae diam ullamcorper hendrerit. Praesent in porttitor urna. Nunc vitae tristique nisi. Donec dignissim leo sed diam pulvinar tempor. Integer nibh sem, facilisis vitae sem ac, gravida tincidunt elit. Quisque eu est aliquam mauris ultricies egestas et at urna. Sed volutpat erat ac elit feugiat scelerisque. Quisque id enim turpis. Morbi lobortis diam finibus, volutpat ante in, luctus enim. Aliquam ornare tempus tincidunt. Quisque efficitur eros ac sem tempor, at porttitor ante hendrerit.'
      }
    ],
    config: {
      style: {},
      layout: []
    }
  }
]

export default {
  title: 'Components/Layout',
  component: Layout,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

export const LayoutBasic = (args) => {
  const props = {
    id: 'LayoutBasic_id',
    type: 'layout',
    data: text_section,
    config: { options: args },
    schema: {}
  }
  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Layout {...props} />
    </div>
  );
};
LayoutBasic.args = {
  spacing: 1,
  direction: 'column',
  justify: 'center',
  alignItems: 'stretch',
  LayoutXS: 2,
  LayoutSM: 2
}
