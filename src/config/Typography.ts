import Typography from 'typography';
import { config } from '@config/SiteConfig';

const typography = new Typography(config.theme);

// Hot reload typography in development.
// tslint:disable-next-line: no-if-statement
if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line: no-expression-statement
  typography.injectStyles();
}

export default typography;
