export const formatearFecha = fecha => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  return fechaNueva.toLocaleDateString('es-ES', opciones);
};

export const generarId = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const timestamp = Date.now().toString(36);
  return random + timestamp;
};

export const bubbleSortByDate = array => {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (new Date(array[i].date) > new Date(array[i + 1].date)) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return array;
};
