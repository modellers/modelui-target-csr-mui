/**
 * https://mui.com/material-ui/getting-started/templates/
 */

import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItem from "@mui/material/ListItem";
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MailIcon from '@mui/icons-material/Mail';
// popup
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

// react-router
import { Routes, Route, Outlet, NavLink, Link } from 'react-router-dom';
// utils
import getIcon from '../../util/IconUtil';

const menu = [
  {
    icon: <MailIcon />,
    title: "Home",
    items: []
  },
  {
    icon: <MailIcon />,
    title: "Education",
    items: [
      {
        title: "Technical Analysis",
        items: [
          {
            title: "The Dow Theory",
            to: "/thedowtheory"
          },
          {
            title: "Charts & Chart Patterns",
            to: "/chart"
          },
          {
            title: "Trend & Trend Lines",
            to: "/trendlines"
          },
          {
            title: "Support & Resistance",
            to: "/sandr"
          }
        ]
      },
      {
        title: "Fundamental Analysis",
        items: [
          {
            title: "The Dow Theory",
            to: "/thedowtheory"
          },
          {
            title: "Charts & Chart Patterns",
            to: "/chart"
          },
          {
            title: "Trend & Trend Lines",
            to: "/trendlines"
          },
          {
            title: "Support & Resistance",
            to: "/sandr"
          }
        ]
      },
      {
        title: "Elliot Wave Analysis",
        items: [
          {
            title: "The Dow Theory",
            to: "/thedowtheory"
          },
          {
            title: "Charts & Chart Patterns",
            to: "/chart"
          },
          {
            title: "Trend & Trend Lines",
            to: "/trendlines"
          },
          {
            title: "Support & Resistance",
            to: "/sandr"
          }
        ]
      }
    ]
  },
  {
    icon: <MailIcon />,
    title: "Options"
  },
  {
    icon: <MailIcon />,
    title: "Blog"
  }
];

function hasChildren(item, data) {
  const children = data[item.id];
  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}

const getPath = (item) => {
  return item.id || item.path;
}

const SingleLevel = ({ item, data }) => {
  return (
    <ListItem component={NavLink} to={getPath(item)}>
      <ListItemIcon>{ getIcon(item.icon) }</ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  );
};

const MultiLevel = ({ item, data }) => {
  const children = data[item.id];
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem  component={NavLink} to={getPath(item)} onClick={handleClick}>
        <ListItemIcon>{ getIcon(item.icon) }</ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit  style={{backgroundColor:'#00000008'}}>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} data={data} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

const MenuItem = ({ item, data }) => {
  const Component = hasChildren(item, data) ? MultiLevel : SingleLevel;
  return <Component item={item} data={data} />
};

export function RenderListMenuItems({ page_not_found, data, parent, position }) {
  /**
   * Renders a list menu grouping the parent nodes together. Depending on options we decide where to place these items
   * Parameters:
   *  - position: can either be left or right
   * 
   * Notes:
   *  - https://stackoverflow.com/questions/63297109/nested-sidebar-menu-with-material-ui-and-reactjs 
   */
  /*
  return (
    <React.Fragment>
        {
          data.map((itm, idx) => {
            const url = itm.id;
            if ((page_not_found !== itm.id) && (itm.unlisted !== true)) {
              // <List component="nav"> ... <Divider />
              return (
                <ListItemButton component={NavLink} to={url}>
                  <ListItemIcon>
                  <Badge badgeContent={itm.highlight || 0} color="secondary">
                    { getIcon(itm.icon) }
                  </Badge>
                  </ListItemIcon>
                  <ListItemText primary={itm.title} title={itm.description || itm.title} />
                </ListItemButton>
              )
            }
          })
        }
    </React.Fragment>
  )
  */
 return data[parent].map((item, key) => <MenuItem key={key} item={item} data={data} />);
}

function MenuPopupState(item, data) {
  const children = data[item.id];
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Dashboard
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close} item={item} data={data} >Profile</MenuItem>
            <MenuItem onClick={popupState.close} item={item} data={data} >My account</MenuItem>
            <MenuItem onClick={popupState.close} item={item} data={data} >Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export function RenderIconMenuItems({ page_not_found, data, parent }) {
  /**
   * Renders a list menu grouping the parent nodes together. Depending on options we decide where to place these items
   * 
   */
  const items = data[parent] || [];
  return (
    <React.Fragment>
        {
          items.map((itm, idx) => {
            const url = itm.id;
            if ((page_not_found !== itm.id) && (itm.unlisted !== true)) {
              // <List component="nav"> ... <Divider />
              if (hasChildren(itm, data) ){ return MenuPopupState(itm, data); }
              else {
                return (
                  <IconButton component={NavLink} title={itm.description || itm.title} to={url} color="inherit">
                    <Badge badgeContent={itm.highlight || 0} color="secondary">
                      { getIcon(itm.icon) }
                    </Badge>
                  </IconButton>
                  )
              }
            }
          })
        }
    </React.Fragment>
  )
}

function groupByParents(data) {
  // Returns a list of sub list based on parent name
  const groups = {};
  data.forEach(function(itm){
    // const itm = data[i];
    const parent_name = itm.parent || "";
    if (!groups[parent_name]) { groups[parent_name] = []; }
    groups[parent_name].push(itm)
  });
  return groups;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  '.active': {
    backgroundColor: '#eeecec5c' // FIXME: should get the menu highlight colour
  },
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '.MenuSecondaryNavigationList .MuiListItemText-primary':{ // FIXME: allow some styling
      fontSize: 'small',
    },    
    '.MenuSecondaryNavigationList':{ // FIXME: allow some styling
      fontSize: 'small',
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      borderTopColor: '#00000012'
    },
    '.active': {
      backgroundColor: '#00000012' // FIXME: should get the menu highlight colour
    },
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

export function RenderListMenu({ parent, page_not_found, data, position, navigation }) {

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const grouped_parents = groupByParents(data)

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashbaord
            </Typography>
            <RenderIconMenuItems page_not_found={page_not_found} data={grouped_parents} parent={"__primary__"} />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <RenderListMenuItems page_not_found={page_not_found} data={grouped_parents} parent={""} position={'left'} />
          </List>
          <List component="nav" className='MenuSecondaryNavigationList' style={{position:'absolute', bottom:0}}>
            <RenderListMenuItems page_not_found={page_not_found} data={grouped_parents} parent={"__secondary__"} position={'left'} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Outlet/>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>    
  )

}
export default RenderListMenu;
