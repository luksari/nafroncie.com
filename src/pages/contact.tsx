import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';
import { Layout, Hero } from '../components';
import { config } from '@config/SiteConfig';

const ContactPage: FunctionComponent = () => (
  <Layout>
    <Helmet title={`Contact | ${config.siteTitle}`} />
    <Hero title='Contact' subTitle={`Get in touch with me`}>
    </Hero>
  </Layout>
);

export default ContactPage;
