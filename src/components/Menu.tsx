import React, { FC, useState, useMemo } from 'react';
import { useDebounce, useWindowScroll, useWindowSize } from 'react-use';
import styled, { css } from 'styled-components';
import { BurgerButton } from '.';
import { media } from '../utils/media';
import { StyledLink } from './Link';
import { LogoSigil } from './Logo';
import { Link } from 'gatsby';
import { motion, Variants } from 'framer-motion';
import { useWindowLocation } from '@utils/useWindowLocation';
import { useViewportScroll, useTransform } from 'framer-motion';
import { theme } from '@config/Theme';

const visibilityVariants = {
  visible: { y: 0 },
  hidden: { y: '-100%' }
}


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

const expandListVariants: Variants = {
  expanded: { 
    x: 0,  
    transition: {
      staggerChildren: 0.07,
    }, 
  },
  closed: {
    x: '100%',
    transition: {
      staggerDirection: -1,
    },
  }
}

const MenuListDesktop = styled(motion.ul)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 0;
`

const MenuListMobile = styled(MenuListDesktop as any).attrs({ variants: expandListVariants })`
  @media ${media.tablet} {
    background: ${({ theme }) => theme.colors.lightText};
    justify-content: center;
    margin: 0;
    top: 0;
    left: 0;
    flex-direction: column;
    position: fixed;
    z-index: 100;
    width: 100vw;
    height: 100vh;
  }
`;

const expandItemVariants = {
  expanded: { 
    x: 0,
  },
  closed: {
    x: '100%',
  }
}

const MenuLink = styled(StyledLink as any)`
  position: relative;
  display: flex;
  width: 200px;
  height: 100%;
  justify-content: center;
  font-family: 'Playfair Display',serif;
  padding: 8px 15px;
  &:hover {
    color: ${({ theme }) => theme.colors.lightText};
    &::after {
      transform: scaleX(1);
    }
  }
  &::after {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.colors.darkText};
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: scaleX(0);
    transform-origin: 100% 100%;
    transition: transform 200ms ease-out;

    @media ${media.tablet} {
      width: 600px;
      top: -30px;
      height: 155px;
    }
    @media ${media.phone} {
      width: 500px;
      top: -15px;
      height: 100px;
    }
  }
  @media ${media.tablet} {
    font-size: 3rem;
    width: 600px;
    height: 155px;
  }
  @media ${media.phone} {
    font-size: 2.5rem;
    width: 500px;
    height: 100px;
  }
`;

const MenuItem = styled(motion.li).attrs({ variants: expandItemVariants })<{ isCovered: boolean }>`
  list-style: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`

const MotionLink = motion.custom(Link);

const MenuListComponent: FC<{ isExpanded: boolean; width: number }> = ({ width, children, isExpanded }) => {
  return (<>
    {width < 1025
      ? 
      <MenuListMobile initial='closed' animate={isExpanded ? 'expanded' : 'closed'}>
        {children}
      </MenuListMobile>
      : 
      <MenuListDesktop>
        {children}
      </MenuListDesktop>
      }
  </>)
}

export const Menu: FC = () => {
  const { width } = useWindowSize();
  const { x, y } = useWindowScroll();
  const [isExpanded, setIsExpanded] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevPos, setPrevPos] = useState({ x, y });

  const { scrollY } = useViewportScroll()
  const highlightScale = useTransform(scrollY, [0, 700, 1000], [0, 0.45, 1])
  const logoScale = useTransform(scrollY, [0, 1000], ['85px', '45px'])
  const colorAnim = useTransform(scrollY, [0, 700], [theme.colors.darkText, theme.colors.lightText])

  const location = useWindowLocation();

  const isBlogPost = useMemo(() => {
    const regex = /(blog)\/((\w+)-(\w)([\w-]*)|\w+)/g;
    return location && regex.test(location.href);
  }, [location]);

  
  useDebounce(
    () => {
      setPrevPos(prevState => ({ ...prevState, y }));
      if (prevPos.y < y && !isExpanded) {
        setVisible(false)
      } else {
        setVisible(false);
      }
    },
    35,
    [x, y],
  );

  const handleMenuClick = () => {
    setIsExpanded(false)
  }

  const isItemCovered = (highlightScale as any).current >= 0.45

  return (
    <MenuWrapper initial='visible' animate={visible || !isBlogPost ? 'visible' : 'hidden'}>
      <MotionLink to='/' style={{ height: logoScale }}>
        <LogoSigil />
      </MotionLink>
      <BurgerButton onClick={() => setIsExpanded((prev) => !prev)} isExpanded={isExpanded} />
      <MenuListComponent isExpanded={isExpanded} width={width}>
        <MenuItem isCovered={isItemCovered} >
          <MenuLink to='/' onClick={handleMenuClick} style={{ transform: 'rotate(var(--rotate))'}}>
            Homepage
          </MenuLink>
        </MenuItem>
        <MenuItem isCovered={isItemCovered} style={{ color: colorAnim }}>
          <MenuLink to='/blog' onClick={handleMenuClick}>
            Blog
          </MenuLink>
        </MenuItem>
        <MenuItem isCovered={isItemCovered} style={{ color: colorAnim }}>
          <MenuLink to='/contact' onClick={handleMenuClick}>
            Contact
          </MenuLink>
        </MenuItem>
    </MenuListComponent>
  </MenuWrapper>
  );
};
