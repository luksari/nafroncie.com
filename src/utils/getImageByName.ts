import { find } from 'lodash';

export const getImageByName = (data: any, name: string) =>
  find(data.allImageSharp.edges, ({ node }) => {
    return node.fluid.originalName.includes(name);
  });
