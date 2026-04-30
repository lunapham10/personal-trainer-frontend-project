import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import EventIcon from '@mui/icons-material/Event';
import BarChartIcon from '@mui/icons-material/BarChart';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Box, IconButton } from '@mui/material'
import { Divider, List, ListItem, ListItemButton, ListItemText, Drawer, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;
const navItems = [
    { icon: <AccountBoxIcon />, title: 'Customers', path: '/' },
    { icon: <DirectionsRunIcon />, title: 'Trainings', path: '/trainings' },
    { icon: <EventIcon />, title: 'Calendar', path: '/calendar' },
    { icon: <BarChartIcon />, title: 'Statistic', path: '/statistic' }
];


export default function NavigationBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    }

    const handleNavigation = (path: string) => {
        navigate(path);
        setMobileOpen(false);
    }

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Personal Trainer
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton onClick={() => handleNavigation(item.path)}>
                            <ListItemIcon sx={{ minWidth: 40, justifyContent: 'center' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6'>Personal Trainer</Typography>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: 'block',
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    </>)
}