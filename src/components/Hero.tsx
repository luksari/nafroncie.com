/* eslint-disable @typescript-eslint/camelcase */
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { LogoImage } from './Logo';
import { media } from '../utils/media';
import { PageTitle, PageTitleSecondary } from './Title';
import { motion } from 'framer-motion';
import leaves from "@static/images/leaves.png"
import dots from "@static/images/dots.png"

const HeroWrapper = styled.div<{ main?: boolean }>`
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: ${({ main }) => main ? '100vh' : '70vh'};
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    background: url(${dots}) no-repeat;
    left: 0;
    top: 0;
    width: 567px;
    height: 574px;
    transform: translate(-250px, -100px) rotateZ(-15deg) scale(1.4);
    @media ${media.desktopS} {
      transform: translate(-250px, -100px) rotateZ(-15deg) scale(1);
    }
  /** Before ends */
  }
  &::after {
    content: '';
    position: absolute;
    width: 873px;
    height: 724px;
    right: 0;
    bottom: 0;
    transform: translate(400px, 380px) rotateZ(-15deg) scale(1.75);
    ${({ theme }) => css`
      background: linear-gradient(195deg, transparent, transparent 35%, ${theme.colors.bgLight} 45%), url(${leaves}) no-repeat;
    
    @media ${media.desktopS} {
      transform: translate(400px, 380px) rotateZ(-15deg) scale(1);
    }
    /** After ends */
    `}
    /** HeroWrapper class  */
    @media ${media.tablet} {
      height: 600px;
      min-height: ${({ main }) => main ? '100vh' : '60vh'};
    }
    
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
    grid-column-gap: 0;
    grid-template-columns: 1fr;
    grid-template-rows: 85px auto auto;
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
  height: 100%;
  @media ${media.tablet} {
    margin-bottom: 25px;
  }

`

const StyledMainTitle = styled(PageTitle)`
  span {
    display: inline-block;
    border-bottom: 3px solid ${({ theme }) => theme.colors.darkText};
  }
  span:first-child {
    background: ${({ theme }) => theme.colors.bgLight};
    color: ${({ theme }) => theme.colors.darkText};
    padding: 0 25px 0 0;

  }
  span:last-child {
    background: ${({ theme }) => theme.colors.darkText};
    color: ${({ theme }) => theme.colors.lightText};
    padding: 0 25px;
  }
  @media ${media.tablet} {
    grid-column: 1/1;
    grid-row: 2/2;
  }
`

const StyledSecondaryTitle = styled(PageTitleSecondary)`
  grid-column: 2/2;
  @media ${media.tablet} {
    grid-column: 1/1;
    grid-row: 3/3;
  }
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
