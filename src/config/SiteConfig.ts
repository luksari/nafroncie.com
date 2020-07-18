import kirkham from "typography-theme-kirkham";

export const config = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'Na Froncie', // Navigation and Site Title
  siteTitleAlt: 'Work with me na froncie', // Alternative Site title for SEO
  siteUrl: 'https://nafroncie.com', // Domain of your site. No trailing slash!
  siteLanguage: 'pl', // Language Tag on <html> element
  defaultBg: 'static/default_post.jpg', // default post background header
  favicon: 'static/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Front-end, Software development, Javascript, Lifestyle', // Your site description
  author: 'Łukasz Tyszkiewicz',
  siteLogo: 'static/sigil.svg', 
  siteBanner: 'static/banner.jpg',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '', // Twitter Username - Optional
  ogSiteName: '', // Facebook Site Name - Optional
  ogLanguage: '', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  // Settings for typography.ts
  baseFontSize: '18px',
  theme: kirkham,

  // Social media
  siteFBAppID: '',

  GOOGLE_TAG_MANAGER_ID: 'GTM-XXXXXXX',
  PostsPerPage: 10,
  HomepagePosts: 4,
};
export default config;
