import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Slider
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MemoryIcon from '@mui/icons-material/Memory';
import CableIcon from '@mui/icons-material/Cable';
import SpeedIcon from '@mui/icons-material/Speed';
import HearingIcon from '@mui/icons-material/Hearing';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export default function Introduccion({ onStartSimulation }) {
  // Estados para la Calculadora de Modulación
  const [rValue, setRValue] = useState(10);
  const [lValue, setLValue] = useState(1.0);
  
  // D = R / L
  const dValue = (rValue / lValue).toFixed(2);

  return (
    <Box sx={{ py: { xs: 4, md: 4 }, bgcolor: '#f8fafc' }}>
      <Container maxWidth="md">
        
        {/* Encabezado */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: '#2563eb', fontWeight: 800, letterSpacing: 1.5 }}>
            Física y Lógica
          </Typography>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 900, 
              color: '#0f172a',
              fontSize: { xs: '2.5rem', md: '3.8rem' }, 
              lineHeight: 1.2,
              my: 2
            }}
          >
            El puente entre los bits <br /> y la energía
          </Typography>
          <Typography variant="h6" sx={{ color: '#475569', fontWeight: 400, lineHeight: 1.6, maxWidth: '700px', mx: 'auto' }}>
            Para que la información pueda viajar por un cable o por el aire, los ceros y unos lógicos de nuestro software deben transformarse en pulsos eléctricos. 
          </Typography>
        </Box>

        {/* Comparación Central */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, border: '1px solid #bfdbfe', borderRadius: 4, height: '100%', bgcolor: '#eff6ff',
                transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MemoryIcon sx={{ color: '#2563eb', fontSize: 32, mr: 1.5 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e3a8a' }}>El Dato</Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#3b82f6', lineHeight: 1.7 }}>
                Pertenece al mundo lógico. Se representa mediante valores discretos, existiendo puramente como <strong>ceros (0)</strong> y <strong>unos (1)</strong> en la memoria del sistema. No tiene masa ni voltaje.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, border: '1px solid #fed7aa', borderRadius: 4, height: '100%', bgcolor: '#fff7ed',
                transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CableIcon sx={{ color: '#ea580c', fontSize: 32, mr: 1.5 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#9a3412' }}>La Señal</Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#f97316', lineHeight: 1.7 }}>
                Pertenece al mundo físico. Es una secuencia de pulsos de tensión discretos y discontinuos. La capa física toma los bits y los codifica estructurando estos niveles de voltaje.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* El desafío físico */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 4, textAlign: 'center' }}>
            El desafío del medio físico
          </Typography>
          
          <Stack spacing={4}>
            {/* Tarjeta 1: Velocidad con Calculadora Integrada */}
            <Paper elevation={1} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, borderLeft: '6px solid #2563eb', bgcolor: '#ffffff' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <SpeedIcon sx={{ color: '#2563eb', fontSize: 32, mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
                    Bits vs. Baudios
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7 }}>
                    La relación entre los datos y la señal no siempre es uno a uno. Existe una diferencia fundamental entre la <strong>Velocidad de Transmisión</strong> (los datos que enviamos en <i>bps</i>) y la <strong>Velocidad de Modulación</strong> (la tasa a la que cambia el estado físico del cable, medida en <i>baudios</i>). Un buen código transmite más bits con menos baudios.
                  </Typography>
                </Box>
              </Box>

              {/* Calculadora de Modulación adentro de la tarjeta */}
              <Box sx={{ bgcolor: '#f1f5f9', p: 3, borderRadius: 2, border: '1px solid #e2e8f0', ml: { xs: 0, sm: 6 } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', mb: 3 }}>
                  Calculadora de Modulación (Relación R y D)
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ color: '#475569', mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <span>Velocidad de Datos R (kbps)</span>
                      <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{rValue} kbps</span>
                    </Typography>
                    <Slider 
                      value={rValue} 
                      onChange={(e, val) => setRValue(val)} 
                      min={1} max={50} step={1}
                      sx={{ color: '#2563eb' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" sx={{ color: '#475569', mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <span>Bits por Elemento L (bits/baudio)</span>
                      <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{lValue.toFixed(1)}</span>
                    </Typography>
                    <Slider 
                      value={lValue} 
                      onChange={(e, val) => setLValue(val)} 
                      min={0.5} max={4} step={0.5}
                      sx={{ color: '#2563eb' }}
                    />
                  </Grid>
                </Grid>
                <Typography variant="body1" sx={{ mt: 2, color: '#475569' }}>
                  Tasa de Modulación Resultante: <strong style={{ color: '#2563eb' }}>{dValue} kBaud</strong>
                </Typography>
              </Box>
            </Paper>

            {/* Tarjeta 2: Ruido y Muestreo */}
            <Paper elevation={1} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, borderLeft: '6px solid #ea580c', bgcolor: '#ffffff' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <HearingIcon sx={{ color: '#ea580c', fontSize: 32, mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
                    Atenuación y Sincronismo
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7 }}>
                    Cuando la señal viaja, choca con ruido electromagnético y pierde fuerza. El dispositivo receptor recibe una onda deformada y debe <strong>temporizar y muestrear</strong> en el microsegundo exacto para no leer un 0 donde había un 1. Si no hay cambios de voltaje frecuentes, el reloj del receptor se desincroniza.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Tarjeta 3: Esquemas de Codificación */}
            <Paper elevation={1} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, borderLeft: '6px solid #10b981', bgcolor: '#ffffff' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <AccountTreeIcon sx={{ color: '#10b981', fontSize: 32, mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
                    ¿Por qué necesitamos Esquemas de Codificación?
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 2 }}>
                    Un <strong>esquema de codificación</strong> es la regla exacta con la que mapeamos los bits lógicos a los pulsos de voltaje. Su principal objetivo es "ayudar" al receptor a no perder el ritmo.
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7 }}>
                    Elegir el código correcto antes de transmitir es vital para equilibrar factores críticos: no consumir exceso de ancho de banda, garantizar que haya cambios de voltaje (transiciones) para que el reloj se autosincronice, y evitar inyectar componente continua que queme los equipos.
                  </Typography>
                </Box>
              </Box>
            </Paper>

          </Stack>
        </Box>

        <Divider sx={{ mb: 6, borderColor: '#e2e8f0' }} />

        {/* Cierre: Transición fluida a la práctica con estilo restaurado */}
        <Box sx={{ 
          textAlign: 'center', 
          px: { xs: 2, md: 8 }, 
          py: 5, 
          bgcolor: '#eff6ff', 
          borderRadius: 4,
          border: '1px dashed #bfdbfe'
        }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e3a8a', mb: 2 }}>
            De la teoría a la práctica
          </Typography>
          <Typography variant="body1" sx={{ color: '#3b82f6', mb: 4, fontSize: '1.1rem', maxWidth: '600px', mx: 'auto' }}>
            No existe una única manera correcta de convertir bits en señales, sino la más adecuada según la distancia y el medio físico. Ahora que conocés las reglas, compará cómo las familias NRZ, AMI o Bifase resuelven este problema.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={onStartSimulation}
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              bgcolor: '#2563eb', 
              color: '#ffffff',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
              '&:hover': { 
                bgcolor: '#1d4ed8',
                boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
              }
            }}
          >
            Abrir Codificador de Señales
          </Button>
        </Box>

      </Container>
    </Box>
  );
}