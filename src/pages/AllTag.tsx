import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';
import { AnimatedTitle, Content, Header, Layout, PageTitle } from '../components';

import { config } from '@config/SiteConfig';
import { IPageProps } from '../models/PageProps';

export const AllTagTemplate: FunctionComponent<IPageProps> = ({ pathContext: { tags } }) => (
  <>
    {tags && (
      <Layout>
        <Helmet title={`Tags | ${config.siteTitle}`} />
        <Header>
          <PageTitle>Tags</PageTitle>
        </Header>
        <Content>
          {tags.map((tag, index: number) => (
            <AnimatedTitle key={index} delay={index}>
              <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
            </AnimatedTitle>
          ))}
        </Content>
      </Layout>
    )}
  </>
);
export default AllTagTemplate;
