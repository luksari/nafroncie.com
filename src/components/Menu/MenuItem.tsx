import styled from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { media, sizes } from '@utils/media';
import React from 'react';
import { theme } from '@config/Theme';
import { Link } from 'gatsby';
import { useWindowSize } from '@utils/useWindowSize';

const expandItemVariants = {
  expanded: {
    x: 0,
  },
  closed: {
    x: '100%',
  },
};

const MotionLink = motion.custom(Link);

const MenuLink = styled(MotionLink)`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 8px 15px;
  font-family: 'Playfair Display', serif;
  &:hover {
    color: ${({ theme }) => theme.colors.lightText};
  }
  @media ${media.tablet} {
    font-size: 3rem;
    width: 600px;
    padding: 15px 15px;
    &:hover {
      color: ${({ theme }) => theme.colors.darkText};
    }
  }
  @media ${media.phone} {
    font-size: 2.5rem;
    width: 400px;
    padding: 15px 15px;
  }
`;

const MenuItemWrapper = styled(motion.li).attrs({
  variants: expandItemVariants,
})`
  list-style: none;
  display: flex;
  margin: 12px;
  justify-content: center;
  align-items: center;
`;

const MenuItemHiglight = styled(motion.span)`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.darkText};
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  transform-origin: 100% 100%;
`;

interface Props {
  text: string;
  to: string;
  onClick: VoidFunction;
}

export const MenuItem = ({ text, to, onClick }: Props) => {
  const { scrollYProgress } = useViewportScroll();
  const { width } = useWindowSize();
  const isDesktop = width && width > sizes.laptopS;
  const scaleXAnim = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const colorAnim = useTransform(
    scrollYProgress,
    [0, 0.2],
    [theme.colors.darkText, theme.colors.lightText],
  );

  return (
    <MenuItemWrapper whileHover={{ scale: 1.1 }}>
      <MenuLink
        to={to}
        onClick={onClick}
        style={{ color: isDesktop && (colorAnim as any) }}
      >
        {text}
        {isDesktop && <MenuItemHiglight style={{ scaleX: scaleXAnim }} />}
      </MenuLink>
    </MenuItemWrapper>
  );
};
