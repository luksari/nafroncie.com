import kirkham from 'typography-theme-kirkham';

export const config = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'Leafcode', // Navigation and Site Title
  siteTitleAlt: 'Leafcode - Frontend, UI/UX, Lifestyle', // Alternative Site title for SEO
  siteUrl: 'https://leafcode.net', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  favicon: 'static/images/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Front-end, Software development, Work, Lifestyle', // Your site description
  author: 'Łukasz Tyszkiewicz - Leafcode',
  siteLogo: 'static/svgs/sigil.svg',
  siteBanner: 'static/images/banner.png',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '', // Twitter Username - Optional
  ogSiteName: '', // Facebook Site Name - Optional
  ogLanguage: '', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  // Settings for typography.ts
  theme: kirkham,

  // Social media
  siteFBAppID: '',

  GOOGLE_TAG_MANAGER_ID: 'GTM-XXXXXXX',
  PostsPerPage: 10,
  HomepagePosts: 4,
};
export default config;
