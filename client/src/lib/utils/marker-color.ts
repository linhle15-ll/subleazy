export function getMarkerColor(color: string) {
  switch (color) {
    case 'red':
      return {
        background: '#EA4335',
        border: '#A50E0E',
      };
    case 'blue':
      return {
        background: '#4285F4',
        border: '#174EA6',
      };
    case 'green':
      return {
        background: '#0F9D58',
        border: '#006425',
      };
    case 'yellow':
      return {
        background: '#FABB05',
        border: '#C28E00',
      };
    case 'purple':
      return {
        background: '#AB47BC',
        border: '#6A1B9A',
      };
    default:
      throw new Error(`Unsupported color: ${color}`);
  }
}
