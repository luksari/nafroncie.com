/* eslint-disable @typescript-eslint/camelcase */
import React, { FC } from 'react';
import styled from 'styled-components';
import { LogoImage } from './Logo';
import { media } from '../utils/media';
import { PageTitle, PageTitleSecondary } from './Title';
import { motion } from 'framer-motion';

const HeroWrapper = styled.div<{ main?: boolean }>`
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

const TitleWrapper = styled(motion.div).attrs({ 
    whileHover: { y: '-15px', transition: { duration: 0.3, type: "tween" }},
    whileTap: { rotateZ: '-8deg', scale: 1.1 }
  })`
  display: grid;
  cursor: pointer;
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

const StyledMainTitle = styled(PageTitle)`
  span {
    display: inline-block;
    border-bottom: 3px solid ${({ theme }) => theme.colors.darkText};
  }
  span:first-child {
    background: ${({ theme }) => theme.colors.lightText};
    color: ${({ theme }) => theme.colors.darkText};
    padding: 0 25px 0 0;

  }
  span:last-child {
    background: ${({ theme }) => theme.colors.darkText};
    color: ${({ theme }) => theme.colors.lightText};
    padding: 0 25px;
  }
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
        {main 
          ? (
            <StyledMainTitle>
              <span>leaf</span>
              <span>code</span>
            </StyledMainTitle>
          )
          : (
            <PageTitle>
             {title}
            </PageTitle>
          )
     
      } 
        <StyledSecondaryTitle>
          {subTitle}
        </StyledSecondaryTitle>
      </TitleWrapper>
      {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
    </HeroWrapper>
  )
};
