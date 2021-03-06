import { IFrontmatter } from './Frontmatter';

export interface IPost {
  readonly id: number;
  readonly excerpt: string;
  readonly body: string;
  readonly timeToRead: number;
  readonly frontmatter: IFrontmatter;
  readonly fields: {
    readonly slug: string;
  };
}
