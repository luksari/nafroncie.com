import React, { FC } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Helmet from 'react-helmet';
import { theme } from '@config/Theme';
import { config } from '@config/SiteConfig';
import { graphql, useStaticQuery } from 'gatsby';
import { split } from 'lodash';
import { media } from '@utils/media';
import { Footer } from './Footer';
import { Menu } from './Menu';
import { Hero } from './Hero';

const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${theme.colors.bgLight};
    background: ${theme.colors.accent};
  }
  body {
    box-sizing: border-box;
    overflow: hidden;
    background: ${theme.colors.bgLight};
    color: ${theme.colors.darkText};
    * {
      box-sizing: border-box;
    }
    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a {
    color: ${theme.colors.grey.dark};
    text-decoration: none;
    transition: color ${theme.transitions.normal};
  }
  a:hover {
    color: ${theme.colors.secondary};
  }
  h1, h2, h3, h4 {
    color: ${theme.colors.darkText};
  }
  blockquote {
    font-style: italic;
    position: relative;
  }

  blockquote:before {
    content: "";
    position: absolute;
    background: ${theme.colors.secondary};
    height: 100%;
    width: 6px;
    margin-left: -1.6rem;
  }
`;

export const Wrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bgLight};
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '100rem')};
  padding: ${({ fullWidth }) => (fullWidth ? '0' : '0 3rem')};
  @media ${media.tablet} {
    padding: ${({ fullWidth }) => (fullWidth ? '0' : '0 3rem')};
  }
  @media ${media.phone} {
    padding: ${({ fullWidth }) => (fullWidth ? '0' : '1rem 1rem')};
  }
`;

const PageWrapper = styled.div`
  padding: 0;
  min-width: 100vw;
  min-height: 100vh;
  max-height: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  title?: string;
  subTitle?: string;
  main?: boolean;
  noHero?: boolean;
}

const buildQuery = graphql`
  query LayoutQuery {
    site {
      buildTime(formatString: "DD.MM.YYYY")
    }
  }
`;

export const Layout: FC<Props> = ({
  children,
  title = 'Leafcode',
  subTitle = 'Frontend, UI/UX i wiele więcej',
  noHero = false,
  main,
}) => {
  const data = useStaticQuery(buildQuery);

  return (
    <ThemeProvider theme={theme}>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <GlobalStyle />
      <PageWrapper>
        {!noHero && <Hero main={main} title={title} subTitle={subTitle} />}
        <Menu />
        <Wrapper fullWidth>{children}</Wrapper>
        <Footer>
          &copy; {split(data.site.buildTime, '.')[2]} Leafcode - Łukasz
          Tyszkiewicz
          <br />
          <span>Ostatnia zmiana: {data.site.buildTime}</span>
        </Footer>
      </PageWrapper>
    </ThemeProvider>
  );
};
