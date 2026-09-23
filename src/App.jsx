import React, { useState } from 'react';
import Introduccion from './Introduccion';
import Simulador from './Simulador';

import { 
  Container, 
  Typography, 
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Button
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';

// Tema Claro Global
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2563eb' },
    secondary: { main: '#ea580c' },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  }
});

function App() {
  // Estado para la navegación
  const [currentView, setCurrentView] = useState('intro'); // 'intro' o 'simulador'

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      
      {/* Navbar Minimalista */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <TimelineIcon sx={{ color: '#2563eb', mr: 2, fontSize: 28 }} />
            
            {/* Título cambiado aquí */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Comunicación de Datos
            </Typography>
            
            <Button 
              onClick={() => setCurrentView('intro')}
              sx={{ 
                color: currentView === 'intro' ? '#2563eb' : '#64748b',
                fontWeight: currentView === 'intro' ? 800 : 500,
                mr: 1
              }}
            >
              Teoría
            </Button>
            <Button 
              onClick={() => setCurrentView('simulador')}
              sx={{ 
                color: currentView === 'simulador' ? '#2563eb' : '#64748b',
                fontWeight: currentView === 'simulador' ? 800 : 500
              }}
            >
              Simulador
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Ruteo Condicional Limpio */}
      {currentView === 'intro' ? (
        <Introduccion onStartSimulation={() => setCurrentView('simulador')} />
      ) : (
        <Simulador />
      )}
      
    </ThemeProvider>
  );
}

export default App;