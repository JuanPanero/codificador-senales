import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { codificarSenal } from './Codificador';

import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select, 
  CssBaseline,
  ThemeProvider,
  createTheme,
  Stack
} from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#ffffff', 
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  }
});

function App() {
  const [cadenaBits, setCadenaBits] = useState('01001100011');
  const [esquema, setEsquema] = useState('NRZ-L');

  const handleInput = (e) => {
    const valorLimpio = e.target.value.replace(/[^01]/g, '');
    setCadenaBits(valorLimpio);
  };

  const esquemasDisponibles = [
    'NRZ-L', 'NRZ-I', 'Bipolar-AMI', 'Pseudoternario',
    'Manchester', 'Manchester Diferencial', 'B8ZS', 'HDB3'
  ];

  const chartData = useMemo(() => {
    const datosSenal = codificarSenal(cadenaBits, esquema);
    
    const labels = [];
    for (let i = 0; i < cadenaBits.length; i++) {
      labels.push(''); 
      labels.push(cadenaBits[i]); 
    }

    return {
      labels,
      datasets: [
        {
          label: `Señal: ${esquema}`,
          data: datosSenal,
          borderColor: '#2563eb', 
          borderWidth: 4,
          stepped: true, 
          pointRadius: 0, 
        },
      ],
    };
  }, [cadenaBits, esquema]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        titleFont: { size: 14 },
        bodyFont: { size: 14, weight: 'bold' },
        callbacks: {
          title: (items) => `Bit N° ${Math.floor(items[0].dataIndex / 2)}`,
          label: (item) => `Valor: ${item.raw > 0 ? '+V' : item.raw < 0 ? '-V' : '0V'}`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: { size: 18, weight: 'bold' },
          color: '#1e293b', 
          maxRotation: 0, 
          autoSkip: false
        },
        grid: {
          color: (context) => context.index % 2 === 0 ? '#e2e8f0' : 'transparent',
          lineWidth: 2
        }
      },
      y: {
        min: -1.5,
        max: 1.5,
        ticks: {
          stepSize: 1,
          font: { size: 16, weight: 'bold' },
          color: '#1e293b',
          callback: function(value) {
            if (value === 1) return '+V';
            if (value === 0) return '0V';
            if (value === -1) return '-V';
            return '';
          }
        },
        grid: {
          color: (context) => context.tick.value === 0 ? '#ef4444' : '#f1f5f9',
          lineWidth: (context) => context.tick.value === 0 ? 2 : 1,
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 4 } }}>
        
        {/* Encabezado con mucho más margen inferior (mb: 7) */}
        <Box mb={7}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 2, 
              color: '#0f172a',
              fontSize: { xs: '1.8rem', md: '2.5rem' }, 
              letterSpacing: '-0.5px'
            }}
          >
            Simulador de Codificación de Señales Digitales
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1.1rem', mb:2 }}>
            Ingrese una cadena de bits y seleccione el esquema de codificación para visualizar la señal física generada.
          </Typography>
        </Box>

        {/* Inputs con más separación entre sí (spacing: 4) y más margen inferior (mb: 8) */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={4} 
        >
          <TextField
            label="Cadena Binaria"
            variant="outlined"
            value={cadenaBits}
            onChange={handleInput}
            placeholder="Ej: 00000000"
            helperText="Solo se admiten valores de 1 y 0"
            sx={{ width: { xs: '100%', sm: '350px' } }}
            InputProps={{ style: { fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 'bold' } }}
          />

          <FormControl variant="outlined" sx={{ width: { xs: '100%', sm: '300px' } }}>
            <InputLabel id="esquema-label">Esquema de Línea</InputLabel>
            <Select
              labelId="esquema-label"
              value={esquema}
              onChange={(e) => setEsquema(e.target.value)}
              label="Esquema de Línea"
              sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {esquemasDisponibles.map(tipo => (
                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Box sx={{ height: 450, width: '100%' }}>
          {cadenaBits.length > 0 ? (
            <Line data={chartData} options={options} />
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography variant="h6" sx={{ color: '#94a3b8' }}>
                Ingresá los bits para trazar la onda de la señal...
              </Typography>
            </Box>
          )}
        </Box>

      </Container>
    </ThemeProvider>
  );
}

export default App;