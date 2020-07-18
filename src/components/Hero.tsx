/* eslint-disable @typescript-eslint/camelcase */
import React, { FC } from 'react';
import styled from 'styled-components';
import { LogoImage } from './Logo';
import { media } from '../utils/media';
import { PageTitle, PageTitleSecondary } from './Title';

const HeroWrapper = styled.div<{  main?: boolean }>`
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: ${({ main }) => main ? '100vh' : '70vh'};
  @media ${media.tablet} {
    min-height: ${({ main }) => main ? '100vh' : '60vh'};
  }

  @media ${media.tablet} {
    height: 600px;
  }

`;


const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-start;
  @media ${media.tablet} {
    align-items: center;
  }
`;
const ChildrenWrapper = styled.div`
  z-index: 10;
  margin-top: 1rem;
  padding: 0.8rem 0.7rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

interface IProps {
  title?: string;
  subTitle?: string;
  main?: boolean;
}

export const Hero: FC<IProps> = ({
  title = 'Na Froncie',
  subTitle = 'Boost your frontend',
  children,
  main = false,
}) => {
  return (
    <HeroWrapper main={main}>
      <TitleWrapper>
        <LogoImage />
        <PageTitle data-text={title}>
          {title}
        </PageTitle>
        <PageTitleSecondary data-text={subTitle}>
          {subTitle}
        </PageTitleSecondary>
      </TitleWrapper>
      {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
    </HeroWrapper>
  )
};
