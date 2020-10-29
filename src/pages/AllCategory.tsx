import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import React, { FC } from 'react';
import { AnimatedTitle, Content, Layout } from '@components/index';
import { IPageProps } from '@models/PageProps';

export const AllCategoryTemplate: FC<IPageProps> = ({
  pathContext: { categories },
}) => (
  <>
    {categories && (
      <Layout
        title="Wszystkie kategorie"
        subTitle="Znajdź interesujące Cię posty w poniższych kategoriach"
      >
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
