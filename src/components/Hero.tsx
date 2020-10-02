/* eslint-disable @typescript-eslint/camelcase */
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { LogoImage } from './Logo';
import { media, sizes } from '@utils/media';
import { PageTitle, PageTitleSecondary } from './Title';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import leaves from "@static/images/leaves.png"
import dots from "@static/images/dots.png"
import { useWindowSize } from '@utils/useWindowSize';

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
  width: 1920px;
  height: 1080px;
  right: 0;
  bottom: 0;
  z-index: 1;

  ${({ theme }) => css`
    background: linear-gradient(180deg, transparent, transparent 30%, ${theme.colors.bgLight} 60%), url(${leaves});
  `
  }
`

const TitleWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: 150px auto;
  grid-column-gap: 15px;
  grid-template-rows: auto auto;
  justify-content: center;
  @media ${media.tablet} {
    align-items: center;
    grid-column-gap: 0;
    grid-template-columns: 1fr;
    grid-template-rows: 85px auto auto;
    justify-content: center;
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
    display: flex;
    justify-content: center;
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
  title = 'Leafcode',
  subTitle = 'Frontend, UI/UX i wiele więcej',
  main = false,
}) => {
  const { width } = useWindowSize();
  const isDesktop = width && width > sizes.laptopS;
  const { scrollY } = useViewportScroll()

  const logoContainerMoveY = useTransform(scrollY, [0, 500], [0, isDesktop ? 300 : 150]);
  const logoContainerScale = useTransform(scrollY, [0, 500], [1, isDesktop ? 0.75 : 0.95]);
  const logoContainerBlur = useTransform(scrollY, [0, 500], ['blur(0)', 'blur(4px)']);
  const leavesScale = useTransform(scrollY, [0, 450], [isDesktop ? 0.5 : 0.3, isDesktop ? 0.7 : 0.5]);
  const dotsMoveY = useTransform(scrollY, [0, 450], [-100, 350]);
  const dotsMoveX = useTransform(scrollY, [0, 450], [-250, -200]);
  const dotsScale = useTransform(scrollY, [0, 450], [1, 1.25]);

  const dotsImageStyleDesktop = { y: dotsMoveY, x:dotsMoveX, scale: dotsScale, rotateZ: -15 };
  const dotsImageStyleMobile = { y: -100, x:-250, scale: 1, rotateZ: -15 };
  const dotsImageStyle = isDesktop ? dotsImageStyleDesktop : dotsImageStyleMobile;

  return (
    <HeroWrapper 
      main={main}
    >
      <DotsImage src={dots} style={dotsImageStyle} />
      <LeavesFadedImage role='img' style={{ scale: leavesScale, x: isDesktop ? 700 : 1100, y: 420, rotateZ: 0}}/>
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
