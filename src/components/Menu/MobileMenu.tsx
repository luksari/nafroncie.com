import React, { FC } from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { media } from '@utils/media';
import { useLockHTMLScroll } from '@utils/useLockHTMLScroll';

const expandListVariants: Variants = {
  expanded: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.2,
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
  closed: {
    x: '100%',
    transition: {
      staggerDirection: -1,
    },
  },
};

const MenuListMobile = styled(motion.div).attrs({
  variants: expandListVariants,
})`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
  @media ${media.tablet} {
    background: ${({ theme }) => theme.colors.lightText};
    justify-content: center;
    margin: 0;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    flex-direction: column;
    position: fixed;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    overscroll-behavior: contain;
  }
`;

export const MobileMenu: FC<{ isExpanded: boolean }> = ({
  children,
  isExpanded,
}) => {
  useLockHTMLScroll(isExpanded);

  return (
    <MenuListMobile
      initial="closed"
      animate={isExpanded ? 'expanded' : 'closed'}
    >
      {children}
    </MenuListMobile>
  );
};
