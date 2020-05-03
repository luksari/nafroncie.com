import Typography from 'typography';
import { config } from '@config/SiteConfig';

const typography = new Typography({
  baseFontSize: config.baseFontSize,
  baseLineHeight: 1.66,
  scaleRatio: 3.157,
  headerFontFamily: [
    config.headerFontFamily,
    "sans-serif",
  ],
  bodyFontFamily: [
    config.bodyFontFamily,
    "sans-serif",
  ],
  headerWeight: 700,
  googleFonts: [
    {
      name: config.headerFontFamily,
      styles: ['400', '700', '600', '900'],
    },
    {
      name: config.bodyFontFamily,
      styles: ['400', '500', '700', '900'],
    },
  ],
});

// Hot reload typography in development.
// tslint:disable-next-line: no-if-statement
if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line: no-expression-statement
  typography.injectStyles();
}

export default typography;
