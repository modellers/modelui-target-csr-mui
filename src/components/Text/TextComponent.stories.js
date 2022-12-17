import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import TextComponent from './TextComponent';
import { triggers, events, config } from './TextComponent'


/// Event addon
export default {
  title: 'Components/Text',
  component: TextComponent,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

export const TextBasic = (args) => {
  const props = {
    id: 'TextBasic_id',
    type: 'texts',
    data: [{
      'id': 'id0',
      'typography': 'title',
      'text': 'Lorem ipsum dolor'
    }, {
      'id': 'id1',
      'typography': 'text',
      'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel.'
    }, {
      'id': 'select_value',
      'typography': 'text',
      'text': 'Sed eget orci tellus. Suspendisse turpis ligula, viverra nec elementum a, posuere id urna. Curabitur vitae felis sed neque venenatis rhoncus quis id nibh. Pellentesque vitae pretium nunc. Duis eu interdum nulla. Sed non cursus sem. Sed sit amet iaculis lacus. Nunc auctor lectus accumsan, hendrerit urna et, porta ipsum. Aenean urna arcu, pretium et eros nec, facilisis luctus dolor. Pellentesque porttitor enim ac arcu placerat iaculis. Sed lorem urna, volutpat at ultrices quis, aliquet quis est. Praesent mi libero, gravida fringilla augue in, laoreet luctus nisl. Phasellus in aliquam nulla. Phasellus eu neque laoreet, aliquet arcu vel, pellentesque orci. Nunc elit nisi, cursus ut odio at, eleifend accumsan ante. In sapien nisl, rhoncus ut massa ac, venenatis auctor risus.'
    }, {
      'id': 'delete_value',
      'typography': 'text',
      'text': 'Donec pulvinar elit nec risus aliquam tempus. Phasellus gravida vehicula lacus ut tincidunt. Maecenas justo neque, congue a lacus at, vulputate tempus leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum dignissim, purus id bibendum tempus, mi eros venenatis risus, a bibendum odio ipsum eget magna. Curabitur pretium, turpis vitae pulvinar placerat, dolor arcu elementum nunc, egestas vehicula odio lacus et ante. Nulla at faucibus ligula, interdum lacinia quam. Integer et tellus augue. Nulla mattis vulputate lacus, sed tincidunt lectus aliquet ut. Phasellus a ipsum sed tortor porta porta viverra eu nisi. Fusce at diam vel ipsum cursus interdum nec sit amet leo. Curabitur odio ex, finibus at leo et, pharetra volutpat urna.'
    }, {
      'id': 'id4',
      'typography': 'text',
      'text': 'Morbi facilisis orci dolor, tristique imperdiet justo interdum tincidunt. Aliquam luctus leo vitae diam ullamcorper hendrerit. Praesent in porttitor urna. Nunc vitae tristique nisi. Donec dignissim leo sed diam pulvinar tempor. Integer nibh sem, facilisis vitae sem ac, gravida tincidunt elit. Quisque eu est aliquam mauris ultricies egestas et at urna. Sed volutpat erat ac elit feugiat scelerisque. Quisque id enim turpis. Morbi lobortis diam finibus, volutpat ante in, luctus enim. Aliquam ornare tempus tincidunt. Quisque efficitur eros ac sem tempor, at porttitor ante hendrerit.'
    }],
    config: { options: args },
    schema: {}
  }
  return (
    <div>
      {prepStoryComponent(props, triggers, events, {
        triggers: {
          push: function () { return { id: 'id' + parseInt(Math.random() * 1000), 'typography': 'text', text: 'Some interesting value ' + parseInt(Math.random() * 1000) } },
          push_front: function () { return { id: 'id' + parseInt(Math.random() * 1000), 'typography': 'text', text: 'Some interesting value ' + parseInt(Math.random() * 1000) } },
          replace: function () { return { id: 'id1', 'typography': 'heading', text: 'Some interesting value ' + parseInt(Math.random() * 1000) } }
        }
      })}
      <TextComponent {...props} />
    </div>
  );
};
TextBasic.args = {
  color: 'inherit'
}