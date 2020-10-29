import React, { FC } from 'react';
import { Article, Layout, PostsContent } from '@components/index';
import { IPageProps } from '@models/PageProps';
import { IPost } from '@models/Post';

export const Category: FC<IPageProps> = ({
  pathContext: { posts, categoryName },
}) => {
  return (
    <Layout title="Kategorie" subTitle={categoryName}>
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
