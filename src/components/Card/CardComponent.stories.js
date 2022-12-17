import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'
// components
import { Card } from './Card';
import { triggers, events, config } from './CardComponent'


export default {
  title: 'Components/Cards',
  component: Card,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

export const TitledCard = (args) => {
  const props = {
    id: 'TitledCard_id',
    type: 'cards',
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
      <Card  {...props} />
    </div>
  );
};
TitledCard.args = {
}


export const TitledCardWithActions = (args) => {
  const props = {
    id: 'TitledCardWithActions_id',
    type: 'cards',
    data: [{
      'id': 'id1',
      'title': 'title 1',
      'actions': {
        'id': 'some_actions1',
        'config': { 'options': {} },
        'schema': {},
        'type': 'buttons',
        'data': [
          {
            'id': 'edit:someid1',
            'title': 'edit',
          }, {
            'id': 'remove:someid1',
            'disabled': true,
            'title': 'delete',
          }
        ]
      }
    }, {
      'id': 'id2',
      'title': 'title 2',
      'actions': {
        'id': 'some_actions2',
        'config': { 'options': {} },
        'type': 'buttons',
        'schema': {},
        'data': [
          {
            'id': 'edit:someid2',
            'title': 'edit',
          }, {
            'id': 'remove:someid2',
            'disabled': true,
            'title': 'false',
          }
        ]
      }
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
      <Card  {...props} />
    </div>
  );
};
TitledCardWithActions.args = {
}


export const MediaCard = (args) => {
  const props = {
    id: 'MediaCard_id',
    type: 'cards',
    data: [{
      'id': 'id1',
      'title': 'title 1',
      'media': 'https://www.thermofisher.com/blog/wp-content/uploads/sites/5/2015/08/single_strawberry__isolated_on_a_white_background.jpg'
    }, {
      'id': 'id2',
      'title': 'title 2',
      'media': 'https://cnlvc.ci/wp-content/uploads/2017/05/Orange-fruit.png'
    }, {
      'id': 'select_value',
      'title': 'select_value',
      'media': 'https://www.vaporfi.com/media/catalog/product/cache/9/thumbnail/600x600/9df78eab33525d08d6e5fb8d27136e95/v/z/vz_eliquid_juicy_red_apple.jpg'
    }, {
      'id': 'delete_value',
      'title': 'delete_value',
      'media': 'https://store.robotmesh.com/media/catalog/product/cache/1/image/1280x/040ec09b1e35df139433887a97daa66f/s/c/screw_6-32_x_0.500.jpg'
    }],
    config: { options: args },
    schema: {}
  }
  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Card  {...props} />
    </div>
  );
};
MediaCard.args = {
}