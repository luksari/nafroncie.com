/* eslint-disable @typescript-eslint/camelcase */
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { LogoImage } from './Logo';
import { media } from '@utils/media';
import { PageTitle, PageTitleSecondary } from './Title';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
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
  /** HeroWrapper class  */
  @media ${media.tablet} {
    height: 600px;
    min-height: ${({ main }) => main ? '100vh' : '60vh'};
  }
`;

const DotsImage = styled(motion.img)`
  position: absolute;
  left: 0;
  top: 0;
  width: 567px;
  height: 574px;
  transform: translate(-250px, -100px) rotateZ(-15deg) scale(1.4);
  @media ${media.desktopS} {
    transform: translate(-250px, -100px) rotateZ(-15deg) scale(1);
  }
`

const LeavesFadedImage = styled(motion.div)`
  position: absolute;
  width: 873px;
  height: 724px;
  right: 0;
  bottom: 0;
  z-index: 1;
  transform: translate(400px, 380px) rotateZ(-15deg);
  ${({ theme }) => css`
    background: linear-gradient(195deg, transparent, transparent 35%, ${theme.colors.bgLight} 45%), url(${leaves});
  `
  }
  @media ${media.desktopS} {
    transform: translate(400px, 380px) rotateZ(-15deg);
  }
`

const TitleWrapper = styled(motion.div)`
  display: grid;
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

const LogoWrapper = styled(motion.div)`
  grid-column: 1/1;
  grid-row: 1/1;
  height: 100%;
  z-index: 10;
  @media ${media.tablet} {
    margin-bottom: 25px;
  }
`

const AnimatedTitle = motion.custom(PageTitle);

const StyledMainTitle = styled(AnimatedTitle)`
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

const AnimatedSubtitle = motion.custom(StyledSecondaryTitle);

interface IProps {
  title?: string;
  subTitle?: string;
  main?: boolean;
}

export const Hero: FC<IProps> = ({
  title = 'leafcode',
  subTitle = 'Frontend, programowanie i kwiatki',
  main = false,
}) => {

  const { scrollY } = useViewportScroll()

  const logoContainerMoveY = useTransform(scrollY, [0, 500], [0, 300]);
  const logoContainerScale = useTransform(scrollY, [0, 500], [1, 0.75]);
  const logoContainerBlur = useTransform(scrollY, [0, 500], ['blur(0)', 'blur(4px)']);
  const leavesScale = useTransform(scrollY, [0, 450], [1, 1.45]);
  const dotsMoveY = useTransform(scrollY, [0, 450], [-100, 350]);
  const dotsScale = useTransform(scrollY, [0, 450], [1, 1.25]);

  return (
    <HeroWrapper 
      main={main}
    >
      <DotsImage src={dots} style={{ y: dotsMoveY, x: -250 , scale: dotsScale, rotateZ: -15 }} />
      <LeavesFadedImage role='img' style={{ scale: leavesScale, x: 400, y: 380, rotateZ: -15}}/>
      <TitleWrapper style={{ y: logoContainerMoveY, scale: logoContainerScale, filter: logoContainerBlur }}>
        <LogoWrapper>
          <LogoImage />
        </LogoWrapper>
        {main 
          ? (
            /** It is also AnimatedTitle due to composition */
            <StyledMainTitle>
              <span>leaf</span>
              <span>code</span>
            </StyledMainTitle>
          )
          : (
            <AnimatedTitle>
            {title}
            </AnimatedTitle>
          )
        }
        <AnimatedSubtitle>
          {subTitle}
        </AnimatedSubtitle>
      </TitleWrapper>
    </HeroWrapper>
  )
};
