import { config } from '@config/SiteConfig';
import { Link } from 'gatsby';
import React, { FC } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Article, Button, Layout, PostsContent } from '../components';
import { Hero } from '../components';
import { IPageProps } from '../models/PageProps';
import { IPost } from '../models/Post';
import { getPostSubline } from '../utils/subline';

const StyledLink = styled(Link)`
  align-self: center;
  color: ${({ theme }) => theme.colors.darkText};
  display: block;
`;

export const Category: FC<IPageProps> = ({ pathContext: { posts, categoryName } }) => {
  const totalCount = posts ? posts.length : 0;

  return (
    <Layout>
      <Helmet title={`${categoryName} | ${config.siteTitle}`} />
      <Hero title={'Categories'} subTitle={`#${categoryName}`}>
        <>
          <StyledLink to={'/categories'}>
            <Button>
              All categories
            </Button>
          </StyledLink>
        </>
      </Hero>
      <PostsContent>
        {posts &&
          posts.map((post: IPost, index) => (
            <Article
              banner={post.frontmatter.banner.childImageSharp.fluid}
              primary={index % 4 === 0}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              excerpt={post.excerpt}
              timeToRead={post.timeToRead}
              slug={post.fields.slug}
              category={post.frontmatter.category}
              key={post.id}
            />
          ))}
      </PostsContent>
    </Layout>
  );
};
export default Category;
