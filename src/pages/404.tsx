import { Link } from 'gatsby';
import React, { FC } from 'react';
import { Content, Layout, Wrapper } from '../components';

export const NotFoundPage: FC = () => (
  <Layout>
    <Wrapper>
      <Content>
        <p>Hmm, chyba nie powinno Cię tu być 🤔</p>
        <Link to="/">Wróć do strony głównej</Link>
      </Content>
    </Wrapper>
  </Layout>
);
export default NotFoundPage;
