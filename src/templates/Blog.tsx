import { graphql } from 'gatsby';
import React, { FC } from 'react';
import {
  Article,
  Layout,
  Pagination,
  PostsContent,
  SectionTitle,
} from '../components';
import { IData } from '../models/Data';

interface IProps {
  readonly data: IData;
  readonly pageContext: {
    readonly currentPage: number;
    readonly totalPages: number;
  };
}

export const BlogPage: FC<IProps> = ({
  pageContext: { currentPage, totalPages },
  data,
}) => {
  const { edges } = data.allMdx;

  return (
    <Layout main>
      <PostsContent>
        <SectionTitle>Wszystkie posty</SectionTitle>
        {edges.map((post, index) => {
          return (
            <Article
              banner={post.node.frontmatter.banner.childImageSharp.fluid}
              title={post.node.frontmatter.title}
              primary={index % 4 === 0}
              date={post.node.frontmatter.date}
              excerpt={post.node.excerpt}
              timeToRead={post.node.frontmatter.timeToRead}
              slug={post.node.fields.slug}
              category={post.node.frontmatter.category}
              key={post.node.id}
            />
          );
        })}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          url="blog"
        />
      </PostsContent>
    </Layout>
  );
};

export default BlogPage;

export const blogQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            category
            timeToRead
            banner {
              childImageSharp {
                fluid(maxWidth: 1920) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                  base64
                  tracedSVG
                  srcWebp
                  srcSetWebp
                }
              }
            }
          }
          excerpt(pruneLength: 255)
        }
      }
    }
  }
`;
