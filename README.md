# Comunicación de Datos: Datos Digitales y Señales Digitales ⚡

[![🔗 Link de la Página Web](https://imgshields.io/badge/Vercel-En_vivo-000000?style=for-the-badge&logo=vercel)](https://codificador-senales.vercel.app/)

Una plataforma web interactiva desarrollada para explorar y visualizar la transformación de datos binarios abstractos en señales físicas de voltaje. Este proyecto fue diseñado como una herramienta didáctica para la asignatura **Comunicación de Datos** (Ingeniería en Sistemas de Información, UTN). 

La aplicación se divide en dos módulos principales: una sección teórica para fundamentar los desafíos del medio físico y un simulador práctico para comprender cómo operan los distintos esquemas de codificación de línea en la capa física de las redes.

## 🚀 Características Principales

* **Módulo Teórico Estructurado:** Explicación clara de la separación entre datos y señales, abordando problemas físicos reales como la atenuación, el ruido y la pérdida de sincronismo.
* **Calculadora de Modulación:** Herramienta integrada con controles deslizantes para calcular en tiempo real la tasa de baudios aplicando la fórmula fundamental de señalización (D = R / L).
* **Renderizado en Tiempo Real:** La gráfica de la señal física se actualiza instantáneamente a medida que se ingresa o modifica la cadena de bits en el simulador interactivo.
* **Conversión de Texto a ASCII:** Permite ingresar cadenas de texto (palabras o frases) y las transforma automáticamente a su equivalente binario (8 bits por carácter) para generar la señal sobre la marcha.
* **Comparación Simultánea de Señales:** Incluye la funcionalidad de seleccionar dos esquemas de codificación distintos en paralelo, facilitando el análisis visual comparativo (por ejemplo, ver la diferencia de ancho de banda físico entre NRZ-L y Manchester).
* **Algoritmos Complejos (Scrambling):** Implementación matemática precisa de técnicas de aleatorización, inyectando dinámicamente violaciones de código al detectar cadenas largas de ceros en esquemas como B8ZS y HDB3.

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

* **React (Vite):** Motor principal de la aplicación web, garantizando transiciones rápidas entre vistas y un entorno de desarrollo ágil.
* **Material UI (MUI) & MUI Icons:** Librería de componentes para el diseño estructurado, tipografía, sistema de grillas y controles de formulario, asegurando un diseño responsivo y profesional.
* **Chart.js & react-chartjs-2:** Motores de renderizado gráfico configurados en modo escalonado (`stepped: true`) para trazar los pulsos discretos y ortogonales de la señal electromagnética.

## ⚙️ Instalación y Uso Local

Para correr este proyecto en tu propia computadora, asegúrate de tener [Node.js](https://nodejs.org/) instalado y sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/JuanPanero/codificador-senales.git](https://github.com/JuanPanero/codificador-senales.git)
