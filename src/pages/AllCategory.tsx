import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';
import { AnimatedTitle, Content, Layout, Hero } from '../components';
import { config } from '@config/SiteConfig';
import { IPageProps } from '../models/PageProps';

export const AllCategoryTemplate: FunctionComponent<IPageProps> = ({ pathContext: { categories } }) => (
  <>
    {categories && (
      <Layout>
        <Helmet title={`Categories | ${config.siteTitle}`} />
        <Hero title='Categories' subTitle='Check out all of them' />
        <Content>
          {categories.map((category, index: number) => (
            <AnimatedTitle delay={index} key={index}>
              <Link to={`/categories/${kebabCase(category)}`}>{category}</Link>
            </AnimatedTitle>
          ))}
        </Content>
      </Layout>
    )}
  </>
);
export default AllCategoryTemplate;
