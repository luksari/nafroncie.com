import React, { FC, useState, useMemo } from 'react';
import { useDebounce, useWindowScroll, useWindowSize } from 'react-use';
import styled from 'styled-components';
import { BurgerButton } from '..';
import { media } from '../../utils/media';
import { LogoSigil } from '../Logo';
import { Link } from 'gatsby';
import { motion, Variants } from 'framer-motion';
import { useWindowLocation } from '@utils/useWindowLocation';
import { useViewportScroll, useTransform } from 'framer-motion';
import { MenuListComponent } from './GenericMenuList';
import { MenuItem } from './MenuItem';

const visibilityVariants: Variants = {
  visible: { y: 0 },
  hidden: { y: '-100%', transition: { type: 'tween', duration: 0.15 } },
};

const MenuWrapper = styled(motion.nav).attrs({ variants: visibilityVariants })`
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 420;
  margin: 0;
  padding: 15px 35px;
  position: absolute;
  position: fixed;
  justify-content: space-between;
  @media ${media.tablet} {
    padding: 10px 15px;
    position: fixed;
  }
`;

const MotionLink = motion.custom(Link);

export const Menu: FC = () => {
  const { width } = useWindowSize();
  const { x, y } = useWindowScroll();
  const [isExpanded, setIsExpanded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevPos, setPrevPos] = useState({ x, y });

  const { scrollYProgress } = useViewportScroll();
  const logoScale = useTransform(scrollYProgress, [0, 0.2], ['85px', '55px']);

  const location = useWindowLocation();

  const isBlogPost = useMemo(() => {
    const regex = /(blog)\/((\w+)-(\w)([\w-]*)|\w+)/g;
    return location && regex.test(location.href);
  }, [location]);

  useDebounce(
    () => {
      setPrevPos((prevState) => ({ ...prevState, y }));
      if (prevPos.y < y && !isExpanded) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    },
    25,
    [x, y],
  );

  const handleMenuClick = () => {
    setIsExpanded(false);
  };

  return (
    <MenuWrapper
      initial="visible"
      animate={visible || !isBlogPost ? 'visible' : 'hidden'}
    >
      <MotionLink to="/" style={{ height: logoScale as any }}>
        <LogoSigil />
      </MotionLink>
      <BurgerButton
        onClick={() => setIsExpanded((prev) => !prev)}
        isExpanded={isExpanded}
      />
      <MenuListComponent isExpanded={isExpanded} width={width}>
        <MenuItem onClick={handleMenuClick} text="Homepage" to="/" />
        <MenuItem onClick={handleMenuClick} text="Blog" to="/blog" />
      </MenuListComponent>
    </MenuWrapper>
  );
};
