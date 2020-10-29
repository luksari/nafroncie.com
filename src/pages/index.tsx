import { graphql, Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';
import {
  Article,
  Button,
  Layout,
  PostsContent,
  AboutMe,
  SectionTitle,
} from '../components';
import { config } from '@config/SiteConfig';
import { IPageProps } from '../models/PageProps';

const SublineWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 15px;
  position: relative;
  background: ${({ theme }) => theme.colors.bgLight};
`;

export const IndexPage: FC<IPageProps> = ({ data }) => {
  const { edges, totalCount } = data.allMdx;

  return (
    <Layout main={true}>
      <PostsContent>
        <SectionTitle>Ostatnie wpisy</SectionTitle>
        {edges.slice(0, config.HomepagePosts).map((post, index) => (
          <Article
            banner={post.node.frontmatter.banner.childImageSharp.fluid}
            primary={index % 4 === 0}
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            excerpt={post.node.excerpt}
            timeToRead={post.node.frontmatter.timeToRead}
            slug={post.node.fields.slug}
            category={post.node.frontmatter.category}
            key={post.node.id}
          />
        ))}
        {totalCount > config.HomepagePosts && (
          <SublineWrapper>
            <Link to="/blog">
              <Button>All articles ( {totalCount} )</Button>
            </Link>
          </SublineWrapper>
        )}
      </PostsContent>
      <AboutMe />
    </Layout>
  );
};
export default IndexPage;

export const IndexQuery = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 4) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 255)
          fields {
            slug
          }
          frontmatter {
            title
            date
            category
            tags
            timeToRead
            banner {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
