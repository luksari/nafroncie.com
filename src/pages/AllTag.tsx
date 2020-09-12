import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import React, { FC } from 'react';
import { AnimatedTitle, Content, Layout } from '@components/index';
import { IPageProps } from '@models/PageProps';

export const AllTagTemplate: FC<IPageProps> = ({ pathContext: { tags } }) => (
  <>
    {tags && (
      <Layout 
        title='Wszystkie tagi'
        subTitle='Sprawdź wszystkie tagi postów'
      >
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
