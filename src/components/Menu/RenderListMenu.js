/**
 * https://mui.com/material-ui/getting-started/templates/
 */

import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
// react-router
import { Routes, Route, Outlet, NavLink, Link } from 'react-router-dom';

export function RenderListMenuItems({ parent, page_not_found, data, position }) {
  /**
   * Renders a list menu grouping the parent nodes together. Depending on options we decide where to place these items
   * Parameters:
   *  - position: can either be left or right
   */
  return (
    <React.Fragment>
      <nav>
        {
          data.map((itm, idx) => {
            const url = itm.id;
            if ((page_not_found !== itm.id) && (itm.unlisted !== true)) {
              // <List component="nav"> ... <Divider />
              return (
                <ListItemButton component={NavLink} to={url} >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={itm.title} />
                </ListItemButton>
              )
            }
          })
        }
      </nav>
    </React.Fragment>
  )
}

function groupByParents(data) {
  // Returns a list of sub list based on parent name
  return data;
}

export function RenderListMenu({ parent, page_not_found, data, position }) {
  /**
   * Renders a list menu grouping the parent nodes together. Depending on options we decide where to place these items
   * Parameters:
   *  - position: can either be left or right
   */
  return (
    <React.Fragment>
      <RenderListMenuItems parent={parent} page_not_found={page_not_found} data={data} position={'left'} />
      <Outlet />
    </React.Fragment>
  )
}

export default RenderListMenu;
