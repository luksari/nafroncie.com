import { getMarkVariant, getPostVarian } from './switchCases';

interface IPostText {
  readonly totalCount: number;
  readonly name: string;
}

export const getPostSubline = ({ totalCount, name }: IPostText): string =>
  `${totalCount} ${getPostVarian(totalCount)} ${getMarkVariant(
    totalCount,
  )} jako ${name}`;
