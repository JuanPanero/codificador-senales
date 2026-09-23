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

export default function Simulador() {
  const [cadenaTexto, setCadenaTexto] = useState('');
  const [cadenaBits, setCadenaBits] = useState('01001100011');
  const [esquema1, setEsquema1] = useState('NRZ-L');
  const [esquema2, setEsquema2] = useState('Ninguno'); 

  const handleTextoInput = (e) => {
    const texto = e.target.value;
    setCadenaTexto(texto);

    if (texto === '') {
      setCadenaBits('');
      return;
    }

    let binarioGenerado = '';
    for (let i = 0; i < texto.length; i++) {
      binarioGenerado += texto[i].charCodeAt(0).toString(2).padStart(8, '0');
    }
    setCadenaBits(binarioGenerado);
  };

  const handleInputBits = (e) => {
    const valorLimpio = e.target.value.replace(/[^01]/g, '');
    setCadenaBits(valorLimpio);
    setCadenaTexto(''); 
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
      datasets: [{
        label: `Señal: ${esquema1}`,
        data: codificarSenal(cadenaBits, esquema1),
        borderColor: '#2563eb', 
        borderWidth: 4,
        stepped: true, 
        pointRadius: 0, 
      }],
    };
  }, [cadenaBits, esquema1, labelsEjeX]);

  const chartData2 = useMemo(() => {
    if (esquema2 === 'Ninguno') return null;
    return {
      labels: labelsEjeX,
      datasets: [{
        label: `Señal: ${esquema2}`,
        data: codificarSenal(cadenaBits, esquema2),
        borderColor: '#ea580c', 
        borderWidth: 4,
        stepped: true, 
        pointRadius: 0, 
      }],
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
          font: { size: 16, weight: 'bold' },
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
          stepSize: 0.5, 
          font: { size: 16, weight: 'bold' }, 
          color: '#1e293b',
          autoSkip: false,
          callback: function(value) {
            if (value === 1) return '+V';
            if (value === 0) return '0';
            if (value === -1) return '-V';
            return null; 
          }
        },
        grid: {
          color: (context) => {
            if (context.tick.value === 0) return '#c5cbd4'; 
            if (context.tick.value === 1 || context.tick.value === -1) return '#e2e8f0';
            return 'transparent'; 
          },
          lineWidth: (context) => context.tick.value === 0 ? 3 : 1,
        }
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 4 } }}>
      <Box mb={6}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 900, 
            mb: 2, 
            color: '#0f172a',
            fontSize: { xs: '2rem', md: '2.8rem' }, 
            letterSpacing: '-0.5px'
          }}
        >
          Simulador Interactivo
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
          Ingrese una cadena de caracteres o bits y seleccione los esquemas para visualizar las señales.
        </Typography>
      </Box>

      {/* Fila 1: TextFields con los anchos originales */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={4} 
        sx={{ marginBottom: '2rem' }} 
      >
        <TextField
          label="Cadena de Caracteres (ASCII)"
          variant="outlined"
          value={cadenaTexto}
          onChange={handleTextoInput}
          placeholder="Ej: Hola"
          helperText="Genera la trama binaria automáticamente"
          sx={{ width: { xs: '100%', md: '300px' } }}
          inputProps={{ style: { fontSize: '1.2rem', fontWeight: 'bold' } }}
          FormHelperTextProps={{ sx: { m: 0, mt: 1 } }}
        />

        <TextField
          label="Cadena Binaria"
          variant="outlined"
          value={cadenaBits}
          onChange={handleInputBits}
          placeholder="Ej: 00000000"
          helperText="Solo se admiten valores de 1 y 0"
          sx={{ flexGrow: 1 }}
          inputProps={{ style: { fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 'bold' } }}
          FormHelperTextProps={{ sx: { m: 0, mt: 1 } }}
        />
      </Stack>

      {/* Fila 2: Selectores */}
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={4} 
        sx={{ marginBottom: '3rem' }} 
      >
        <FormControl variant="outlined" sx={{ width: { xs: '100%', md: '300px' } }}>
          <InputLabel id="esquema1-label">Codificación Principal</InputLabel>
          <Select
            labelId="esquema1-label"
            value={esquema1}
            onChange={(e) => setEsquema1(e.target.value)}
            label="Codificación Principal"
            sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            {esquemasDisponibles.map(tipo => (
              <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ width: { xs: '100%', md: '300px' } }}>
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
                  Ingresá los bits o caracteres para trazar la onda...
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
                    Ingresá los bits o caracteres para trazar la onda...
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Stack>
    </Container>
  );
}