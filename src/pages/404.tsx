import React, { FC } from 'react';
import { Content, Header, Layout, PageTitle, Wrapper } from '../components';

export const NotFoundPage: FC = () => (
  <Layout>
    <Wrapper>
      <Content>
        <p>Hey, I think that something went wrong because you should not be here 🤔</p>
      </Content>
    </Wrapper>
  </Layout>
);
export default NotFoundPage;
