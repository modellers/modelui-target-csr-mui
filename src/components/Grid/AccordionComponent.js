// https://material-ui.com/components/autocomplete/
import React from 'react';
// material ui components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// 
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// styles
import { withStyles } from '@mui/styles';

import { StateLayout, LayoutBase, events as baseEvents, triggers as baseTriggers } from '../Layout/LayoutBase'
export const events = baseEvents;
export const triggers = baseTriggers;
export const options = {
  "id": "accordion",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Accordion",
  "description": "Accordion options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {},
  "required": []
}

export const item = {
  "id": "accordion-section",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Accordion section",
  "description": "Accordion section",
  "x-layout": "component-item",
  "type": "object",
  "version": 0.1,
  "properties": {
    "id": {
      "readOnly": false,
      "writeOnly": false,
      "description": "TBD",
      "type": "string"
    },
    "title": {
      "title": "Title",
      "description": "Title shown",
      "type": "string",
      "default": "Section"
    },
    "subtitle": {
      "title": "Sub heading",
      "description": "Additional information",
      "type": "string",
      "default": ""
    },
    "disabled": {
      "title": "disabled",
      "description": "Is this accorion item diabled",
      "type": "boolean",
      "default": false
    },
    "content": {
      "title": "content",
      "description": "TBD",
      "readOnly": false,
      "writeOnly": false,
      "type": "object",
      "default": {}
    }
  },
  "required": ["title", "disabled"]
}
export const config = {

  name: "Accordion",
  type: "accordion",
  author: "Kjartan Jónsson",
  description: "Accordion component",
  version: 0.1,
  relation: {
    contains: ["accordion-section"],
    within: "component" // parent
  },
  contains: {
    "accordion-section": item
  },
  options: options,
  state: StateLayout
}

const style = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: 'gray',
    textAlign: 'right',
    width: '100%'
  },
});

class AccordionComponent extends LayoutBase {
  /**
   * Used to manage internal state of avatars
   */

  constructor(props) {
    props.config.options = { ...{}, ...props.config.options }
    super(props);
  }

  handleChange(itm_id, idx) {
    /* TODO
    const items = this.state.data;
    
    // if only one open at once
    for (let item_idx in items){
      items[item_idx].expanded = false;
    }
    */
    // toggle
    // items[idx].expanded = !items[idx].expanded; // toggle mode
    //this.setState({...this.state, ...{data: items}})
  }

  renderTextDetails = (classes, itm) => {
    const secondaryHeading = itm.subtitle;
    if (secondaryHeading) {
      return (
        <React.Fragment>
          <Typography className={classes.heading} >{itm.title}</Typography>
          <Typography className={classes.secondaryHeading}>{secondaryHeading}</Typography>
        </React.Fragment>
      )
    }
    return (
      <Typography className={classes.heading}>{itm.title}</Typography>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.data.map((itm, idx) =>
        (
          // <Accordion key={itm.id + idx} disabled={itm.disabled || false} expanded={this.showSelectedRow(itm)} onSelect={(evt) => this.handleSelect(itm.id, itm, idx, evt)} onChange={this.handleChange(itm.id, idx)}>
          <Accordion key={itm.id + idx} disabled={itm.disabled || false} onChange={this.handleChange(itm.id, idx)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {this.renderTextDetails(classes, itm)}
            </AccordionSummary>
            <AccordionDetails>
              <div>{this.renderContent(classes, itm)}</div>
            </AccordionDetails>
          </Accordion>
        )
        )}
      </div>
    )
  }
}

export default withStyles(style, { withTheme: true })(AccordionComponent);
