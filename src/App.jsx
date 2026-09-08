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
  const [esquema1, setEsquema1] = useState('NRZ-L');
  const [esquema2, setEsquema2] = useState('Ninguno'); 

  const handleInput = (e) => {
    const valorLimpio = e.target.value.replace(/[^01]/g, '');
    setCadenaBits(valorLimpio);
  };

  const esquemasDisponibles = [
    'NRZ-L', 'NRZ-I', 'Bipolar-AMI', 'Pseudoternario',
    'Manchester', 'Manchester Diferencial', 'B8ZS', 'HDB3'
  ];

  const labelsEjeX = useMemo(() => {
    const labels = [];
    for (let i = 0; i < cadenaBits.length; i++) {
      labels.push(''); 
      labels.push(cadenaBits[i]); 
    }
    return labels;
  }, [cadenaBits]);

  const chartData1 = useMemo(() => {
    return {
      labels: labelsEjeX,
      datasets: [
        {
          label: `Señal: ${esquema1}`,
          data: codificarSenal(cadenaBits, esquema1),
          borderColor: '#2563eb', 
          borderWidth: 4,
          stepped: true, 
          pointRadius: 0, 
        },
      ],
    };
  }, [cadenaBits, esquema1, labelsEjeX]);

  const chartData2 = useMemo(() => {
    if (esquema2 === 'Ninguno') return null;
    return {
      labels: labelsEjeX,
      datasets: [
        {
          label: `Señal: ${esquema2}`,
          data: codificarSenal(cadenaBits, esquema2),
          borderColor: '#ea580c', 
          borderWidth: 4,
          stepped: true, 
          pointRadius: 0, 
        },
      ],
    };
  }, [cadenaBits, esquema2, labelsEjeX]);

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
        title: {
          display: true,
          text: 'Voltaje',
          font: { size: 16, weight: 'bold' },
          color: '#475569'
        },
        ticks: {
          stepSize: 0.5, // El truco está acá: forzamos a que pase por los enteros
          font: { size: 16, weight: 'bold' }, 
          color: '#1e293b',
          callback: function(value) {
            if (value === 1) return '+V';
            if (value === 0) return '0';
            if (value === -1) return '-V';
            return null; // Oculta las etiquetas de los medios puntos (-1.5, -0.5, etc)
          }
        },
        grid: {
          color: (context) => {
            // Dibuja una línea más oscura y evidente justo en el voltaje 0
            if (context.tick.value === 0) return '#c5cbd4'; 
            // Dibuja líneas suaves en los topes
            if (context.tick.value === 1 || context.tick.value === -1) return '#f1f5f9';
            // Vuelve transparentes las líneas intermedias
            return 'transparent'; 
          },
          lineWidth: (context) => context.tick.value === 0 ? 2 : 1,
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 4 } }}>
        
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
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1.1rem', mb: 2 }}>
            Ingrese una cadena de bits y seleccione los esquemas de codificación para visualizar o comparar las señales generadas.
          </Typography>
        </Box>

        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={4} 
          mb={8} 
        >
          <TextField
            label="Cadena Binaria"
            variant="outlined"
            value={cadenaBits}
            onChange={handleInput}
            placeholder="Ej: 00000000"
            helperText="Solo se admiten valores de 1 y 0"
            sx={{ width: { xs: '100%', md: '350px' } }}
            InputProps={{ style: { fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 'bold' } }}
          />

          <FormControl variant="outlined" sx={{ width: { xs: '100%', md: '250px' } }}>
            <InputLabel id="esquema1-label">Esquema Principal</InputLabel>
            <Select
              labelId="esquema1-label"
              value={esquema1}
              onChange={(e) => setEsquema1(e.target.value)}
              label="Esquema Principal"
              sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {esquemasDisponibles.map(tipo => (
                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ width: { xs: '100%', md: '250px' } }}>
            <InputLabel id="esquema2-label">Comparar con (Opcional)</InputLabel>
            <Select
              labelId="esquema2-label"
              value={esquema2}
              onChange={(e) => setEsquema2(e.target.value)}
              label="Comparar con (Opcional)"
              sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              <MenuItem value="Ninguno"><em>Ninguno</em></MenuItem>
              {esquemasDisponibles.map(tipo => (
                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack spacing={6} sx={{ width: '100%' }}>
          
          <Box>
            <Typography variant="h6" sx={{ color: '#2563eb', fontWeight: 'bold', mb: 2 }}>
              Señal 1: {esquema1}
            </Typography>
            <Box sx={{ height: esquema2 === 'Ninguno' ? 450 : 350, width: '100%' }}>
              {cadenaBits.length > 0 ? (
                <Line data={chartData1} options={options} />
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Typography variant="h6" sx={{ color: '#94a3b8' }}>
                    Ingresá los bits para trazar la onda de la señal...
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {esquema2 !== 'Ninguno' && (
            <Box>
              <Typography variant="h6" sx={{ color: '#ea580c', fontWeight: 'bold', mb: 2 }}>
                Señal 2: {esquema2}
              </Typography>
              <Box sx={{ height: 350, width: '100%' }}>
                {cadenaBits.length > 0 ? (
                  <Line data={chartData2} options={options} />
                ) : (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography variant="h6" sx={{ color: '#94a3b8' }}>
                      Ingresá los bits para trazar la onda de la señal...
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}

        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;