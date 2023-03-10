// https://material-ui.com/api/typography/
import React from 'react';

import { ImageList, ImageListItem } from '../../theme/components';

import { withStyles } from '../../theme/components';

import { structs } from 'modelui-core-runtime';

export const events = structs.ListBase.events;
export const triggers = structs.ListBase.triggers;


export const options = {
  "id": "images",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Image options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {},
  "required": []
}

export const item = {
  "id": "image",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Image",
  "description": "Image option",
  "x-layout": "component-item",
  "type": "object",
  "version": 0.1,
  "properties": {
    "id": {
      "description": "identifier",
      "type": "string",
      "readOnly": false,
      "writeOnly": false
    },
    "url": {
      "description": "URL to image",
      "type": "string",
      "default": ""
    },
    "title": {
      "description": "Title of the image when missing or hovering",
      "type": "string",
      "default": ""
    },
    "cols": {
      "description": "Column",
      "type": "integer",
      "default": 1,
      "minimum": 1,
      "maximum": 3,
    }
  },
  "required": ["title"]
}

export const config = {
  name: "Images",
  type: "images",
  author: "Kjartan Jónsson",
  description: "Image component",
  version: 0.1,
  relation: {
    contains: ["image"],
    within: "component" // parent
  },
  contains: {
    "image": item
  },
  options: options,
  state: structs.ListBase.StateList
}

const style = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  imageList: {
    width: 500,
    height: 450,
  }
});
class ImageComponent extends structs.ListBase.ListBase {

  render() {
    const classes = style;

    return (
      <div className={classes.root}>
        <ImageList rowHeight={360} className={classes.imageList} cols={3}>
          {this.state.data.map((item) => (
            <ImageListItem key={item.url} cols={item.cols || 1}>
              <img src={item.url} alt={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }
}

export default withStyles(style, { withTheme: true })(ImageComponent);
