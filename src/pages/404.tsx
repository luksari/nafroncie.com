import { Link } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';
import { Content, Header, Layout, PageTitle, Wrapper } from '../components';
import { config } from '@config/SiteConfig';

export const NotFoundPage: FC = () => (
  <Layout>
    <Helmet title={`404 Not found | ${config.siteTitle}`} />
    <Header>
      <Link to='/'>{config.siteTitle}</Link>
      <PageTitle>Not found</PageTitle>
    </Header>
    <Wrapper>
      <Content>
        <p>Hey, I think that something went wrong because you should not be here 🤔</p>
      </Content>
    </Wrapper>
  </Layout>
);
export default NotFoundPage;
