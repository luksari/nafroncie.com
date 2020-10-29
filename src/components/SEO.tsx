import { config } from '@config/SiteConfig';
import React, { FC } from 'react';
import Helmet from 'react-helmet';
import { IPost } from '../models/Post';

interface ISEO {
  readonly postNode: IPost;
  readonly postPath: string;
  readonly postSEO: boolean;
}

// tslint:disable-next-line: cyclomatic-complexity
export const SEO: FC<ISEO> = ({ postNode, postPath, postSEO }) => {
  const postMeta = postNode.frontmatter;
  const title = postSEO ? postMeta.title : config.siteTitle;
  const description = postSEO ? postNode.excerpt : config.siteDescription;

  const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;
  const image = `${config.siteUrl}${realPrefix}${config.siteBanner}`;
  const postURL = `${config.siteUrl}${realPrefix}${postPath}`;

  const blogURL = config.siteUrl + config.pathPrefix;
  const schemaOrgJSONLD: ReadonlyArray<any> = postSEO
    ? [
        {
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          '@id': blogURL,
          url: blogURL,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
        },
      ]
    : [
        {
          '@context': 'http://schema.org',
          '@id': postURL,
          '@type': 'BlogPosting',
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
          name: title,
          url: postURL,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description: config.siteDescription,
          datePublished: postNode.frontmatter.date,
          dateModified: postNode.frontmatter.date,
          author: {
            '@type': 'Person',
            name: config.author,
          },
          publisher: {
            '@type': 'Organization',
            name: config.author,
            logo: {
              '@type': 'ImageObject',
              url: config.siteUrl + realPrefix + config.siteLogo,
            },
          },
          isPartOf: blogURL,
          mainEntityOfPage: {
            '@type': 'WebSite',
            '@id': blogURL,
          },
        },
      ];

  return (
    <Helmet>
      <html lang={config.siteLanguage} />
      <title>{config.siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      <meta property="og:locale" content={config.ogLanguage} />
      <meta
        property="og:site_name"
        content={config.ogSiteName ? config.ogSiteName : ''}
      />
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO && <meta property="og:type" content="article" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta
        property="fb:app_id"
        content={config.siteFBAppID ? config.siteFBAppID : ''}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : ''}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={config.siteUrl} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
export default SEO;
