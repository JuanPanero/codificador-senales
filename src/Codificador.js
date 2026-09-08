export const codificarSenal = (bits, tipo) => {
  let datos = []; 
  let ultimoVoltaje = 1; 
  let ultimoPulso = -1; 
  let unosDesdeSustitucion = 0;
  let bitsArray = bits.split('');

  for (let i = 0; i < bitsArray.length; i++) {
    const bit = bitsArray[i];

    if (tipo === 'NRZ-L') {
      let v = bit === '1' ? -1 : 1;
      datos.push(v, v);
    } 
    else if (tipo === 'NRZ-I') {
      if (bit === '1') ultimoVoltaje = ultimoVoltaje === 1 ? -1 : 1;
      datos.push(ultimoVoltaje, ultimoVoltaje);
    }
    else if (tipo === 'Bipolar-AMI') {
      if (bit === '0') {
        datos.push(0, 0);
      } else {
        ultimoPulso = ultimoPulso === 1 ? -1 : 1;
        datos.push(ultimoPulso, ultimoPulso);
      }
    }
    else if (tipo === 'Pseudoternario') {
      if (bit === '1') {
        datos.push(0, 0);
      } else {
        ultimoPulso = ultimoPulso === 1 ? -1 : 1;
        datos.push(ultimoPulso, ultimoPulso);
      }
    }
    else if (tipo === 'Manchester') {
      if (bit === '1') {
        datos.push(-1, 1);
      } else {
        datos.push(1, -1);
      }
    }
    else if (tipo === 'Manchester Diferencial') {
      let inicio;
      if (bit === '0') {
        inicio = ultimoVoltaje === 1 ? -1 : 1; 
      } else {
        inicio = ultimoVoltaje; 
      }
      let fin = inicio === 1 ? -1 : 1; 
      datos.push(inicio, fin);
      ultimoVoltaje = fin;
    }
    else if (tipo === 'B8ZS') {
      if (bit === '0' && bitsArray.slice(i, i + 8).join('') === '00000000') {
        if (ultimoPulso === 1) {
          datos.push(0,0, 0,0, 0,0, 1,1, -1,-1, 0,0, -1,-1, 1,1);
        } else {
          datos.push(0,0, 0,0, 0,0, -1,-1, 1,1, 0,0, 1,1, -1,-1);
        }
        i += 7; 
      } else if (bit === '1') {
        ultimoPulso = ultimoPulso === 1 ? -1 : 1;
        datos.push(ultimoPulso, ultimoPulso);
      } else {
        datos.push(0, 0);
      }
    }
    else if (tipo === 'HDB3') {
      if (bit === '0' && bitsArray.slice(i, i + 4).join('') === '0000') {
        let par = (unosDesdeSustitucion % 2 === 0);
        if (par) {
          let pulsoB = ultimoPulso === 1 ? -1 : 1;
          let pulsoV = pulsoB; 
          datos.push(pulsoB,pulsoB, 0,0, 0,0, pulsoV,pulsoV);
          ultimoPulso = pulsoV;
        } else {
          let pulsoV = ultimoPulso; 
          datos.push(0,0, 0,0, 0,0, pulsoV,pulsoV);
          ultimoPulso = pulsoV;
        }
        unosDesdeSustitucion = 0; 
        i += 3; 
      } else if (bit === '1') {
        ultimoPulso = ultimoPulso === 1 ? -1 : 1;
        datos.push(ultimoPulso, ultimoPulso);
        unosDesdeSustitucion++;
      } else {
        datos.push(0, 0);
      }
    }
  }
  return datos;
};