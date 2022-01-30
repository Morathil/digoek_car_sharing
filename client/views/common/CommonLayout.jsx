import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CarRentalIcon from '@mui/icons-material/CarRental';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import HistoryIcon from '@mui/icons-material/History';
import { setContext } from '@apollo/client/link/context';
import Auth from 'client/views/common/Auth'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-access-token": token || ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const drawerWidth = 240;

function showRentCar () {
  location.href = 'rent_car.html'
}

function showActiveRents () {
  location.href = 'active_rents.html'
}

function logout () {
  localStorage.clear()
  location.href = '/'
}

export default function CommonLayout(props) {
  return (
    <Auth>
      <ApolloProvider client={client}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                Car Sharing
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <ListItem button onClick={showRentCar}>
                  <ListItemIcon>
                    <CarRentalIcon />
                  </ListItemIcon>
                  <ListItemText primary='Rent a Car' />
                </ListItem>
                <ListItem button onClick={showActiveRents}>
                  <ListItemIcon>
                    <CardTravelIcon />
                  </ListItemIcon>
                  <ListItemText primary='Active rents' />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary='Order History' />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary='Admin' />
                </ListItem>                
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {props.children}
          </Box>
        </Box>
      </ApolloProvider>
    </Auth>
  );
}