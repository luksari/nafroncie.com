import React, { FunctionComponent } from 'react';
import { Article, Layout, PostsContent } from '@components/index';
import { IPageProps } from '@models/PageProps';

export const TagTemplate: FunctionComponent<IPageProps> = ({
  pathContext: { posts, tagName },
}) => {
  return (
    <Layout title="Tagi" subTitle={`#${tagName}`}>
      <PostsContent>
        {posts &&
          posts.map((post, index) => (
            <Article
              banner={post.frontmatter.banner.childImageSharp.fluid}
              primary={index % 4 === 0}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              excerpt={post.excerpt}
              timeToRead={post.frontmatter.timeToRead}
              slug={post.fields.slug}
              category={post.frontmatter.category}
              key={post.id}
            />
          ))}
      </PostsContent>
    </Layout>
  );
};
export default TagTemplate;
