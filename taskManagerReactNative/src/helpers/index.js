/**
 * It takes a date and returns a string with the date formatted in a way that is readable by humans
 * @param fecha - The date you want to format.
 * @param [modo=basica] - 'basica'
 * @returns Ttring with the date formatted
 */
export const formatearFecha = (fecha, modo = 'basica') => {
  const fechaNueva = new Date(fecha);
  let opciones;

  switch (modo) {
    case 'basica':
      opciones = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      break;
    case 'corta':
      opciones = {
        month: 'short',
        day: 'numeric',
      };
      break;
    case 'completaCorta':
      opciones = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      };
  }
  return fechaNueva.toLocaleDateString('es-ES', opciones);
};

/**
 * It generates a random string of 11 characters, then adds the current timestamp to the end of it.
 * @returns A function that returns a string.
 */
export const generarId = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const timestamp = Date.now().toString(36);
  return random + timestamp;
};

/**
 * It takes an array of objects, and sorts them by date.
 * @returns The array is being returned.
 */
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
