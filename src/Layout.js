import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from './logo.png';
import { Input, TextField } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const drawerWidth = 340;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const StyledTextField = styled(TextField)({
    background: "#fff",
    marginTop: "20px",
    borderRadius: "15px",
    '& .MuiFilledInput-root': {
        background: "#fff"
    }
})

export default function PersistentDrawerLeft(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [collapseOneOpen, setCollapseOneOpen] = React.useState(false);
    const [collapseTwoOpen, setCollapseTwoOpen] = React.useState(false);
    const [collapseThreeOpen, setCollapseThreeOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{background:"#fff", color:"#000"}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Good Morning! Tue Jan 21, 2021 9:39 AM
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        background: "#050e2d",
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        padding: 3,
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton sx={{color:"#fff"}} onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <img src={logo} />
                <StyledTextField id="outlined-basic" label="Search" variant="filled" />
                <h2 style={{ color: "gray", textDecoration: 'uppercase', marginBottom: "30px" }}>Settings</h2>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: '#050e2d' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={()=>{setCollapseOneOpen(!collapseOneOpen)}} sx={{color: "#fff"}}>
                        <ListItemIcon sx={{color:"#fff"}}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="ATM Settings" />
                        {collapseOneOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={collapseOneOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ bgcolor: '#050e2d', color:"#fff"}}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="People" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: '#050e2d' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={() => { setCollapseTwoOpen(!collapseTwoOpen) }} sx={{ color: "#fff" }}>
                        <ListItemIcon sx={{ color: "#fff" }}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Business Setup" />
                        {collapseTwoOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={collapseTwoOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ bgcolor: '#050e2d', color: "#fff" }}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="People" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: '#050e2d' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <ListItemButton onClick={() => { setCollapseThreeOpen(!collapseThreeOpen) }} sx={{ color: "#fff" }}>
                        <ListItemIcon sx={{ color: "#fff" }}>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="User Management" />
                        {collapseThreeOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={collapseThreeOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ bgcolor: '#050e2d', color: "#fff" }}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="People" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {props.children}
            </Main>
        </Box>
    );
}