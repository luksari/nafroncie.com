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
  display: grid;
  grid-template-columns: 150px auto;
  grid-column-gap: 15px;
  grid-template-rows: auto auto;
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

const StyledLogo = styled(LogoImage)`
  grid-column: 1/1;
  grid-row: 1/1;
`


const StyledSecondaryTitle = styled(PageTitleSecondary)`
  grid-column: 2/2;
`
interface IProps {
  title?: string;
  subTitle?: string;
  main?: boolean;
}

export const Hero: FC<IProps> = ({
  title = 'leafcode',
  subTitle = 'Boost your frontend',
  children,
  main = false,
}) => {
  return (
    <HeroWrapper main={main}>
      <TitleWrapper>
        <StyledLogo />
        <PageTitle>
          {title}
        </PageTitle>
        <StyledSecondaryTitle>
          {subTitle}
        </StyledSecondaryTitle>
      </TitleWrapper>
      {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
    </HeroWrapper>
  )
};
