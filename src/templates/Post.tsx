import React, { FC } from 'react';
import { config } from '@config/SiteConfig';
import { graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {
  Header,
  Layout,
  PrevNext,
  SEO,
  StyledLink,
  Subline,
  PostTitle,
  LinkUnderlineStyles,
} from '../components';
import { IPathContext } from '../models/PathContext';
import { IPost } from '../models/Post';
import { media } from '../utils/media';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const PostContent = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
  box-shadow: 0px 15px 10px -15px ${({ theme }) => theme.colors.darkText};
  a {
    ${({ theme }) =>
      LinkUnderlineStyles(theme.colors.accentSecondary, theme.colors.accent)};
  }

  @media ${media.laptopS} {
    width: 70%;
  }
  @media ${media.tablet} {
    width: 80%;
    padding: 1rem;
    margin-top: 1rem;
  }
`;

const PostSubline = styled(Subline)`
  color: ${({ theme }) => theme.colors.darkText};
  width: 250px;
  * {
    margin: 0 6px;
  }
`;

const StyledBackgroundImage = styled(BackgroundImage)`
  margin-top: 65px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: contain;
  height: 720px;
  width: 1280px;
  margin-left: auto;
  margin-right: auto;

  @media ${media.tablet} {
    height: 720px;
    width: 100%;
  }
`;

const TagsWrapper = styled.div`
  padding: 5px 0;
  width: 100%;
  font-size: 15px;
  background: ${({ theme }) => theme.colors.bgLight};
`;
const PostHeader = styled(Header)`
  min-height: 300px;
  background: #ffffff77;
  display: flex;
  align-items: center;
`;

interface IProps {
  readonly data: {
    readonly mdx: IPost;
  };
  readonly pathContext: IPathContext;
}
export const PostPage: FC<IProps> = ({
  pathContext: { prev, next },
  data: { mdx: post },
}) => {
  return (
    <Layout noHero>
      {post && (
        <>
          <SEO postPath={post.fields.slug} postNode={post} postSEO />
          <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />

          <StyledBackgroundImage
            fluid={post.frontmatter.banner.childImageSharp.fluid}
          >
            <PostHeader>
              <PostSubline sectionTitle>
                <StyledLink to="/blog">Blog</StyledLink>/
                <StyledLink
                  to={`/categories/${kebabCase(post.frontmatter.category)}`}
                >
                  {post.frontmatter.category}
                </StyledLink>
                / {post.frontmatter.date}
              </PostSubline>
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </PostHeader>
          </StyledBackgroundImage>
          <PostContent>
            {/* <MDXProvider> */}
            <MDXRenderer>{post.body}</MDXRenderer>
            {/* </MDXProvider> */}
            {post.frontmatter.tags && (
              <TagsWrapper>
                Tagi: &#160;
                {post.frontmatter.tags.map((tag, i) => (
                  <>
                    <StyledLink key={tag} to={`/tags/${kebabCase(tag)}`}>
                      {tag}
                    </StyledLink>
                    {i < post.frontmatter.tags.length - 1 ? `, ` : ``}
                  </>
                ))}
              </TagsWrapper>
            )}
            <PrevNext prev={prev} next={next} />
          </PostContent>
        </>
      )}
    </Layout>
  );
};

export default PostPage;

export const postQuery = graphql`
  query BlogPostQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
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
`;
