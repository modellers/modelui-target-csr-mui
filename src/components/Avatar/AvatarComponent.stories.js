import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import AvatarComponent from './AvatarComponent';
import { triggers, events, config } from './AvatarComponent'


/// Event addon
export default {
  title: 'Components/Avatar',
  component: AvatarComponent,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

export const AvatarBasic = (args) => {

  const props = {
    id: 'AvatarBasic_id',
    type: 'avatars',
    data: [{
      'id': 'id1',
      'heading': 'heading 1',
      'title': 'title 1',
      'image': 'https://mybluerobot.com/wp-content/plugins/svg-avatars-generator/data/custom-img/girl.png'
    }, {
      'id': 'id2',
      'title': 'title 2',
      'image': 'https://avatars2.githubusercontent.com/u/36167650?s=400&v=4'
    }, {
      'id': 'select_value',
      'title': 'select_value',
      'image': 'https://cdn.vectorstock.com/i/1000x1000/71/98/male-avatar-profile-icon-round-man-face-vector-18307198.jpg'
    }, {
      'id': 'delete_value',
      'title': 'delete_value',
      'image': 'http://d24b33.medialib.edu.glogster.com/avatars/users/1/1/70/99/1709937.png?v=1297145784'
    }],
    config: { options: args },
    schema: {}
  }
  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <AvatarComponent {...props} />
    </div>
  );

};
AvatarBasic.args = {
  shape: 'circular',
  max_count: 4
}