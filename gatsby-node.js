const path = require('path');
const _ = require('lodash');
const config = require('./src/config/SiteConfig').default;

exports.onCreateNode = ({
  node,
  actions,
}) => {
  const {
    createNodeField
  } = actions;

  if (node.internal.type === 'Mdx' && _.has(node, 'frontmatter') && _.has(node.frontmatter, 'title')) {
    const slug = _.kebabCase(node.frontmatter.title);
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};

const getPostsByType = (posts, classificationType) => {
  const postsByType = {};
  posts.forEach(({
    node
  }) => {
    const nodeClassificationType = node.frontmatter[classificationType];
    if (nodeClassificationType) {
      if (_.isArray(nodeClassificationType)) {
        nodeClassificationType.forEach(name => {
          if (!_.has(postsByType, name)) {
            postsByType[name] = [];
          }
          postsByType[name].push(node);
        });
      } else {
        const name = nodeClassificationType;
        if (!postsByType[name]) {
          postsByType[name] = [];
        }
        postsByType[name].push(node);
      }
    }
  });
  return postsByType;
};

const createClassificationPages = ({
  createPage,
  posts,
}) => {
  const classifications = [{
      singularName: 'category',
      pluralName: 'categories',
      template: {
        part: path.resolve(`src/pages/Category.tsx`),
        all: path.resolve(`src/pages/AllCategory.tsx`),
      },
      postsByClassificationNames: getPostsByType(posts, 'category'),
    },
    {
      singularName: 'tag',
      pluralName: 'tags',
      template: {
        part: path.resolve(`src/pages/Tag.tsx`),
        all: path.resolve(`src/pages/AllTag.tsx`),
      },
      postsByClassificationNames: getPostsByType(posts, 'tags'),
    },
  ];

  classifications.forEach(classification => {
    const names = Object.keys(classification.postsByClassificationNames);

    createPage({
      path: _.kebabCase(`/${classification.pluralName}`),
      component: classification.template.all,
      context: {
        [`${classification.pluralName}`]: names.sort(),
      },
    });

    names.forEach(name => {
      const postsByName = classification.postsByClassificationNames[name];
      createPage({
        path: `/${classification.pluralName}/${_.kebabCase(name)}`,
        component: classification.template.part,
        context: {
          posts: postsByName,
          [`${classification.singularName}Name`]: name,
        },
      });
    });
  });
};

exports.onCreateWebpackConfig = ({
  actions
}) => {
  actions.setWebpackConfig({
    node: {     
      fs: 'empty',
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@static': path.resolve(__dirname, 'static/'),
        '@templates': path.resolve(__dirname, 'src/templates/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@config': path.resolve(__dirname, 'src/config/'),
        '@models': path.resolve(__dirname, 'src/models/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
      },
    },
  });
};

exports.createPages = async ({
  actions,
  graphql,
  reporter,
}) => {
  const {
    createPage
  } = actions;

  const postTemplate = path.resolve('src/templates/Post.tsx');

  const result = await graphql(`{
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 10000
      ) {
        edges {
          node {
            excerpt(pruneLength: 255)
            body
            id
            fields {
              slug
            }
            frontmatter {
              date
              title
              category
              tags
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
          }
        }
      }
      }`)
    
      if (result.errors) {
        reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query', result.errors)
      }

      const posts = result.data.allMdx.edges;
      const postsPerPage = config.PostsPerPage;
      const numPages = Math.ceil(posts.length / postsPerPage);
      
      posts.forEach(({ node }, i) => {
          createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: path.resolve('src/templates/Blog.tsx'),
            context: {
              id: node.id,
              limit: postsPerPage,
              skip: i * postsPerPage,
              totalPages: numPages,
              currentPage: i + 1
            },
          });
        });

      createClassificationPages({
        createPage,
        posts,
        postsPerPage,
        numPages
      });

      posts.forEach(({
        node
      }, index) => {
        const next = index === 0 ? null : posts[index - 1].node;
        const prev = index === posts.length - 1 ? null : posts[index + 1].node;

        createPage({
          path: `/blog/${_.kebabCase(node.frontmatter.title)}`,
          component: postTemplate,
          context: {
            slug: _.kebabCase(node.frontmatter.title),
            id: node.id,
            title: node.frontmatter.title,
            prev,
            next,
          },
        });
      });
};
