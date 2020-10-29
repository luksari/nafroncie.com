export const getPostVarian = (postCount: number): string =>
  postCount === 1
    ? 'post'
    : postCount >= 2 && postCount <= 4
    ? 'posty'
    : postCount >= 5 || postCount === 0
    ? 'postów'
    : '-';

export const getMarkVariant = (postCount: number): string =>
  postCount === 1
    ? 'oznaczony'
    : postCount >= 2 && postCount <= 4
    ? 'oznaczone'
    : postCount >= 5
    ? 'oznaczonych'
    : '';
