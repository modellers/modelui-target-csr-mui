import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import ImageComponent from './ImageComponent';
import { triggers, events, config } from './ImageComponent'


/// Event addon
export default {
  title: 'Components/Image',
  component: ImageComponent,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

export const ImageBasic = (args) => {

  const props = {
    id: 'ImageBasic_id',
    type: 'images',
    data: [{
      'id': 'id0',
      'url': 'https://material-ui.com/static/images/image-list/breakfast.jpg',
      'title': 'Image',
      'cols': 2,
    }, {
      'id': 'select_value',
      'url': 'https://material-ui.com/static/images/image-list/burgers.jpg',
      'title': 'Image',
      'cols': 1,
    }, {
      'id': 'delete_value',
      'url': 'https://material-ui.com/static/images/image-list/honey.jpg',
      'title': 'Image',
      'cols': 1,
    }, {
      'id': 'id3',
      'url': 'https://material-ui.com/static/images/image-list/vegetables.jpg',
      'title': 'Image',
      'cols': 2,
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events, {
        triggers: {
          push: function () {
            return {
              'id': 'id' + parseInt(Math.random() * 1000),
              'url': 'https://material-ui.com/static/images/image-list/honey.jpg',
              'title': 'Image',
              'cols': 1,
            }
          },
          push_front: function () {
            return {
              'id': 'id' + parseInt(Math.random() * 1000),
              'url': 'https://material-ui.com/static/images/image-list/vegetables.jpg',
              'title': 'Image',
              'cols': 1,
            }
          }
        }
      })}
      <ImageComponent {...props} />
    </div>
  );
};
ImageBasic.args = {
  color: 'inherit'
}