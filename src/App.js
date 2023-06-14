import { AppBar, IconButton, SwipeableDrawer, Toolbar, styled, useTheme } from '@mui/material'
import React, { Component } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Layout from "./Layout";
import DataTable from './dataTable';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      isSideBarOpen: false,
    }
  }
  componentDidMount(){
    const drawerWidth = 240;

    this.DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));

    this.AppBar = styled(AppBar, {
      shouldForwardProp: (prop) => prop !== 'isSidebarOpen',
    })(({ theme, isSidebarOpen }) => ({
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(isSidebarOpen && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));
  }
  onSidebarClose(){
    this.setState({
      ...this.state, isSideBarOpen: false
    });
  }
  onSidebarOpen(){
    this.setState({
      ...this.state, isSideBarOpen: true
    });
  }
  render() {
    // const theme = useTheme()
    return (
      <>
        <Layout>
          <DataTable />
        </Layout>
      </>
    )
  }
}
