const colors = {
  primary: '#7EA87A', // Color for buttons or links
  secondary: '#BCD589',
  accent: '#21675B',
  accentSecondary: '#469874',
  warning: '#FA6900',
  error: '#D32F2F',
  bgLight: '#FEF8ED', // Background color
  darkText: '#363E4B',
  lightText: '#FEF8ED',
  grey: {
    main: 'rgba(23, 23, 23)',
    dark: 'rgba(0, 0, 0, 0.9)',
    default: 'rgba(0, 0, 0, 0.7)',
    light: 'rgba(0, 0, 0, 0.5)',
    ultraLight: 'rgba(0, 0, 0, 0.25)',
    bluish: '#363E4B',
  },
};

const gradients = {
  primary: (angle: number) =>
    `linear-gradient(${angle}deg, ${colors.primary}, ${colors.secondary})`,
  accent: (angle: number) =>
    `linear-gradient(${angle}deg, ${colors.accent}, ${colors.accentSecondary})`,
  warning: (angle: number) =>
    `linear-gradient(${angle}deg, ${colors.warning}, ${colors.error})`,
};

const transitions = {
  normal: '0.5s',
};

const fontSize = {
  smallest: '0.75rem',
  small: '0.9rem',
  medium: '1.5rem',
  big: '2.9rem',
  biggest: '4.5rem',
};

export const theme = {
  colors,
  transitions,
  fontSize,
  gradients,
};

export type ThemeInterface = typeof theme;
