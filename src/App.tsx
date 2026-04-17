
import './App.css'
import * as React from 'react';
import { AppBar, Typography, Container, CssBaseline, Toolbar, Box, IconButton } from '@mui/material'
import CustomerList from './components/CustomerList';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, List, ListItem, ListItemButton, ListItemText, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar';
import Statistic from './components/Statistic';

const drawerWidth = 240;
const navItems = [
  { title: 'Customers', path: '/' },
  { title: 'Trainings', path: '/trainings' },
  { title: 'Calendar', path: '/calendar' },
  { title: 'Statistic', path: '/statistic' }
];

function App() {
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
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleNavigation(item.path)}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Container maxWidth='lg'>
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
      <Box sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/statistic" element={<Statistic />} />
        </Routes>
      </Box>
      <CssBaseline />
    </Container>
  )
}

export default App
