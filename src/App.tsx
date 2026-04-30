import './App.css'
import { Container, CssBaseline, Box } from '@mui/material'
import CustomerList from './components/CustomerList';
import { Routes, Route } from 'react-router-dom';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar';
import Statistic from './components/Statistic';
import NavigationBar from './components/NavigationBar';

function App() {
  
  return (
    <Container maxWidth='lg'>
      <Box sx={{ mt: 3 }}>
        <NavigationBar />
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
