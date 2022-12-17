// https://kitson-broadhurst.medium.com/quickly-set-up-a-theme-in-material-ui-and-access-it-in-your-components-ba0565304887
import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
// styles
import { withStyles } from '@mui/styles';
// DD components
import { renderContent } from '../../util/ComponentUtil';
// event handler
import EventManager from '../../event/Event';
import { StateList, ListBase, events as baseEvents, triggers as baseTriggers } from '../../event/ListBase'
// utils
import { isObject } from '../../util/ObjUtil';

// TBI
// import DDAvatar from '../Avatar/Avatar';
// import { LayoutRender } from '../Layout/Layout';
// import CardContent from '@mui/material/CardContent';

export const events = baseEvents;
export const triggers = baseTriggers;

export const options = {
  "id": "cards",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "description": "Card options",
  "x-layout": "component",
  "type": "object",
  "version": 0.1,
  "properties": {},
  "required": []
}

export const config = {

  name: "Cards",
  type: "cards",
  author: "Kjartan Jónsson",
  description: "Card component",
  version: 0.1,
  relation: {
    contains: [],
    within: "component" // parent
  },
  options: options,
  state: StateList
}

const style = theme => ({

  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 25,
    width: '102.04082%'
  },
  /*
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "white",
  }, 
  */
  root: {
    maxWidth: 345,
    minWidth: 345,
    marginRight: 17,
    marginLeft: 17,
    marginTop: '2%',
    margin: 0
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
    marginTop: 4,
    marginBottom: 4
  },
  header: {
    fontSize: 'small',
    // backgroundColor: theme.palette.info.light,
    // maxHeight: 10,
    // color: theme.palette.gray
  },
});

function CardComponentHeader(props) {
  let ddAvatar = null;
  let action = null;
  if (props.data) {
    // FIXME: ddAvatar = <DDAvatar data={props.data.avatar} view={props.view} />
  }
  if (props.data.actions) { // if layout is defined we are adding actions
    action = CardComponentActions({ 'data': props.data.actions, 'view': props.view })
  }

  if (props.data.title) {
    return (<CardHeader
      className={props.classes}
      // classes={props.classes}
      avatar={ddAvatar}
      action={action}
      title={props.data.title}
      subheader={props.data.subheader}
    />);
  } else {
    return null;
  }
}
/*
function CardComponentContent(props) {
  let data = { ...props.data }; // default value
  let layout = props.layout || [{ type: 'text' }];
  if (props.pick) { // lets pick data elseware
    data = { description: props.data[props.pick.description] }
  }
  if (props.override) { // lets pick data elseware
    data = { description: props.override.description }
  }
  if (!data) return null;
  const content = LayoutRender(props.id, data, props.classes, { layout: layout }, 'card_content', ['card', 'table', 'layout']);
  return <CardContent>{content}</CardContent>;
}

function findItemIndexById(identifier, items) {
  let index = null;
  for (let idx in items) {
    const itm = items[idx];
    if (itm.id === identifier) { index = idx; break; }
  }
  return index;
}
*/

function CardComponentMedia(props) {
  let image_source = props.data.media;
  let click_event_data = null;
  // image with link
  if (isObject(props.data.media)) {
    image_source = props.data.media.image;
    if (props.data.media.data) {
      click_event_data = props.data.media.data;
    }
  }
  return (
    <CardMedia onClick={event => {
      if (click_event_data) {
        EventManager.getInstance().addEvent(props.data.component_id, 'selected', click_event_data, null);
      }
    }} key={props.id + "media"}
      className={props.classes}
      // content={component}
      image={image_source}
      title={props.data.title}
    />
  )
}

function CardComponentActions(action_content) {
  //if (!props.view) { return null; }
  const actions = renderContent({}, { content: action_content.data }); //LayoutRender(content.id, content.data, content.classes, content.view, 'card_actions', ['card', 'menu', 'list', 'form', 'graph', 'table', 'layout']);
  return (
    <CardActions disableSpacing>
      {actions}
    </CardActions>
  )
}

function CardComponentRender(card_id, item, classes, view, component_id) {
  let content = [];

  let id = item.id;
  item.component_id = component_id;
  let data = item;
  if (item.title || item.actions) {
    content.push(<CardComponentHeader id={id + "header"} key={id + "header"} classes={classes.header} data={data} view={item.view} />)
  }

  if (item.media) {
    content.push(<CardComponentMedia id={id + "media"} key={id + "media"} classes={classes.media} data={data} />)
  }
  /*
  if (item.type === 'content') {
    content.push(<CardComponentContent id={id} key={id} classes={classes} data={data} pick={item.pick} override={item.data} layout={item.layout} view={item.view} />)
  }
  if (item.type === 'actions') {
    content.push(<CardComponentActions id={id} key={id} classes={classes} data={data} />)
  }
  */

  return <Card id={card_id} key={card_id} className={classes.root} >{content}</Card>;
}

class CardComponent extends ListBase {

  constructor(props) {
    super(props);
    this.container_id = props.id + '_container';
  }

  render() {

    // style
    const { classes } = this.props;

    // render
    // {this.data.map((itm_props, idx) => (CardComponentRender(this.props.id + '_card_' + idx, itm_props, classes, this.view)))}
    return (
      <div id={this.container_id} key={this.container_id} className={classes.list}>
        {this.state.data.map((itm_props, idx) => (CardComponentRender(idx, itm_props, classes, this.view, this.props.id)))}
      </div>
    );
  }

  /**
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
          {getIcon('font-awesome:fa fa-spinner')}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>                                
        </CardActions>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
   */
}

export default withStyles(style, { withTheme: true })(CardComponent);