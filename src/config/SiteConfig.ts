export const config = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'Na Froncie', // Navigation and Site Title
  siteTitleAlt: 'Na Froncie - Frontend new', // Alternative Site title for SEO
  siteUrl: 'https://typescript-power-blog.github.com', // Domain of your site. No trailing slash!
  siteLanguage: 'pl', // Language Tag on <html> element
  siteBanner: '/assets/bg.jpg', // Your image for og:image tag. You can find it in the /static folder
  defaultBg: '/assets/default_post.jpg', // default post background header
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Front-end, Back-end, Wiedza, Programowanie', // Your site description
  author: 'Łukasz Tyszkiewicz', // Author for schemaORGJSONLD
  siteLogo: '/assets/logo.svg', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '', // Twitter Username - Optional
  ogSiteName: '', // Facebook Site Name - Optional
  ogLanguage: '', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  // Settings for typography.ts
  headerFontFamily: 'Ubuntu',
  bodyFontFamily: 'Ubuntu',
  baseFontSize: '18px',

  // Social media
  siteFBAppID: '',

  //
  Google_Tag_Manager_ID: 'GTM-XXXXXXX',
  POST_PER_PAGE: 10,
  HOMEPAGE_POSTS: 4,
};
export default config;