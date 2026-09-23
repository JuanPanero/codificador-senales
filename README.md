# Simulador de Codificación de Señales Digitales ⚡

[![🔗 Link de la Página Web](https://imgshields.io/badge/Vercel-En_vivo-000000?style=for-the-badge&logo=vercel)](https://codificador-senales.vercel.app/)

Una aplicación web interactiva desarrollada para visualizar la transformación de datos binarios en señales físicas de voltaje. Este proyecto fue diseñado como una herramienta didáctica para una actividad de "Clase Invertida" de la asignatura **Comunicación de Datos** (Ingeniería en Sistemas de Información, UTN). Su objetivo es permitir a los usuarios comprender cómo operan los distintos esquemas de codificación de línea en la capa física de las redes de comunicaciones.

## 🚀 Características Principales

* **Renderizado en Tiempo Real:** La gráfica de la señal física se actualiza instantáneamente a medida que se ingresa o modifica la cadena de bits.
* **Conversión Texto a ASCII:** Permite ingresar cadenas de texto (palabras o frases) y las transforma automáticamente a su equivalente binario (8 bits por carácter) para generar la señal sobre la marcha.
* **Comparación Simultánea de Señales:** Incluye la funcionalidad de seleccionar dos esquemas de codificación distintos en paralelo, facilitando el análisis visual comparativo (por ejemplo, ver la diferencia de tasa de modulación entre NRZ-L y Manchester).
* **Interfaz Profesional:** Construida con Material UI para ofrecer una experiencia de usuario limpia, plana y libre de distracciones, emulando la lectura de un instrumento de medición.
* **Algoritmos Complejos:** Implementación matemática precisa de esquemas de aleatorización (Scrambling), inyectando dinámicamente violaciones de código al detectar cadenas largas de ceros.

## 📡 Esquemas de Codificación Soportados

El simulador implementa las reglas de modulación para las siguientes familias de códigos:

1. **Familia NRZ (No Retorno a Cero):**
   * NRZ-L (Level)
   * NRZ-I (Invert on ones)
2. **Binario Multinivel:**
   * Bipolar-AMI (Alternate Mark Inversion)
   * Pseudoternario
3. **Códigos Bifase (Autosincronizados):**
   * Manchester
   * Manchester Diferencial
4. **Técnicas de Aleatorización (Scrambling):**
   * B8ZS (Bipolar with 8-Zeros Substitution)
   * HDB3 (Bipolar de Alta Densidad de 3 ceros)

## 🛠️ Tecnologías Utilizadas

* **React (Vite):** Motor principal de la aplicación web, elegido por su extrema rapidez en el levantamiento del entorno de desarrollo.
* **Material UI (MUI):** Librería de componentes para el diseño estructurado, tipografía y controles de formulario.
* **Chart.js & react-chartjs-2:** Motores de renderizado gráfico configurados en modo escalonado (`stepped: true`) para trazar los pulsos discretos y ortogonales de la señal electromagnética.

## ⚙️ Instalación y Uso Local

Para correr este proyecto en tu propia computadora, asegúrate de tener [Node.js](https://nodejs.org/) instalado y sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/JuanPanero/codificador-senales.git](https://github.com/JuanPanero/codificador-senales.git)
   ```

2. **Ingresar al directorio:**
   ```bash
   cd codificador-senales
   ```

3. **Instalar las dependencias:**
   ```bash
   npm install
   ```

4. **Levantar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   Haz clic en el enlace local que devuelve la terminal (usualmente `http://localhost:5173/`).

---
*Desarrollado para la demostración interactiva de Datos Digitales y Señales Digitales - Comunicación de Datos (UTN).*
