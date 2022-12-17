import React from 'react';

// test utils
import { prepStoryComponent, createStoryArgumentTypesFromSchema } from '../../test/utils/StoryUtil'

// components
import { Button } from './Button';
import { triggers, events, config } from './ButtonComponent'

export default {
  title: 'Components/Buttons',
  component: Button,
  argTypes: createStoryArgumentTypesFromSchema(config.options)
};

export const SingleButton = (args) => {

  const props = {
    id: 'SingleButton_id',
    type: 'buttons',
    data: [{
      'id': 'id1',
      'title': 'title 1',
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Button {...props} />
    </div>
  );
};
SingleButton.args = {
  buttonVariant: 'contained',
  size: 'large',
  color: 'primary'
}

export const TextButtons = (args) => {

  const props = {
    id: 'TextButtons_id',
    type: 'buttons',
    data: [{
      'id': 'id1',
      'title': 'title 1',
    }, {
      'id': 'id2',
      'disabled': true,
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
      <Button {...props} />
    </div>
  );
};
TextButtons.args = {
  buttonVariant: 'contained',
  size: 'large',
  color: 'primary'
}

export const SingleIcon = (args) => {
  const props = {
    id: 'SingleIcon_id',
    type: 'buttons',
    data: [{
      'id': 'id1',
      'icon': 'font-awesome:fa fa-gift'
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Button {...props} />
    </div>
  );
};
SingleIcon.args = {
  buttonVariant: 'contained',
  size: 'medium',
  color: 'primary'
}

export const SingleIconText = (args) => {

  const props = {
    id: 'SingleIconText_id',
    type: 'buttons',
    data: [{
      'id': 'id1',
      'title': 'title 1',
      'icon': 'font-awesome:fa fa-gift'
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Button {...props} />
    </div>
  );
};
SingleIconText.args = {
  buttonVariant: 'contained',
  size: 'medium',
  color: 'primary'
}

export const IconButtons = (args) => {
  const props = {
    id: 'IconButtons_id',
    type: 'buttons',
    data: [{
      'id': 'id1',
      'icon': 'font-awesome:fa fa-cloud'
    }, {
      'id': 'id2',
      'disabled': true,
      'icon': 'font-awesome:fa fa-gift'
    }, {
      'id': 'select_value',
      'icon': 'font-awesome:fa fa-heart-o'
    }, {
      'id': 'delete_value',
      'icon': 'font-awesome:fa fa-spinner fa-spin'
    }],
    config: { options: args },
    schema: {}
  }
  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Button {...props} />
    </div>
  );
};
IconButtons.args = {
  buttonVariant: 'contained',
  size: 'medium',
  color: 'primary'
}


export const IconTextButtons = (args) => {

  const props = {
    id: 'IconTextButtons_id',
    type: 'buttons',
    data: [{
      'id': 'id1',
      'title': 'title 1',
      'icon': 'font-awesome:fa fa-cloud'
    }, {
      'id': 'id2',
      'title': 'title 2',
      'disabled': true,
      'icon': 'font-awesome:fa fa-gift'
    }, {
      'id': 'select_value',
      'title': 'select_value',
      'icon': 'font-awesome:fa fa-heart-o'
    }, {
      'id': 'delete_value',
      'title': 'delete_value',
      'icon': 'font-awesome:fa fa-spinner fa-spin'
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Button  {...props} />
    </div>
  );
};
IconTextButtons.args = {
  buttonVariant: 'contained',
  size: 'medium',
  color: 'primary'
}


export const SingleFab = (args) => {

  const props = {
    id: 'SingleFab_id',
    type: 'buttons',
    data: [{
      'id': 'id1',
      'icon': 'material-ui:Add'
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Button {...props} />
    </div>
  );
};

SingleFab.args = {
  buttonVariant: 'fab',
  size: 'medium',
  color: 'primary'
}

export const SingleFabs = (args) => {

  const props = {
    id: 'SingleFabs_id',
    type: 'buttons',
    data: [{
      'id': 'id1',
      'title': 'title 1',
      'icon': 'font-awesome:fa fa-inbox'
    }, {
      'id': 'id2',
      'title': 'title 2',
      'disabled': true,
      'icon': 'font-awesome:fa fa-envelope-open'
    }, {
      'id': 'id3',
      'title': 'title 3',
      'icon': 'material-ui:Star'
    }],
    config: { options: args },
    schema: {}
  }

  return (
    <div>
      {prepStoryComponent(props, triggers, events)}
      <Button {...props} />
    </div>
  );

};
SingleFabs.args = {
  buttonVariant: 'fab',
  size: 'medium',
  color: 'primary'
}