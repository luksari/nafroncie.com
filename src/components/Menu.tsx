import React, { FC, useState, useMemo } from 'react';
import { useDebounce, useWindowScroll, useWindowSize } from 'react-use';
import styled from 'styled-components';
import { BurgerButton } from '.';
import { media } from '../utils/media';
import { StyledLink } from './Link';
import { LogoSigil } from './Logo';
import { Link } from 'gatsby';
import { motion, Variants } from 'framer-motion';
import { useWindowLocation } from '@utils/useWindowLocation';
import * as MenuMark from "@static/images/mark.png"

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
  transform: scaleX(1);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 0;
`

const MenuListMobile = styled(MenuListDesktop).attrs({ variants: expandListVariants })`
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

const MenuItem = styled(motion.li).attrs({ variants: expandItemVariants })`
  list-style: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const MenuLink = styled(StyledLink)`
  position: relative;
  display: flex;
  width: 200px;
  justify-content: center;
  color: ${({ theme }) => theme.colors.lightText};
  transition: transform 300ms ease-in-out, color 300ms ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: scale(1.1)
  }
  &::after {
    content: '';
    background: url(${MenuMark});
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;
    top: -10px;
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
    transition: transform 300ms ease-in-out;
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

  const location = useWindowLocation();

  const isBlogPost = useMemo(() => {
    const regex = /(blog)\/((\w+)-(\w)([\w-]*)|\w+)/g;
    return location && regex.test(location.href);
  }, [location]);

  
  useDebounce(
    () => {
      setPrevPos(prevState => ({ ...prevState, y }));
      prevPos.y < y && !isExpanded ? setVisible(false) : setVisible(true);
    },
    35,
    [x, y],
  );

  const handleMenuClick = () => {
    setIsExpanded(false)
  }


  return (
    <MenuWrapper initial='visible' animate={visible || !isBlogPost ? 'visible' : 'hidden'}>
      <Link to='/'>
        <LogoSigil />
      </Link>
      <BurgerButton onClick={() => setIsExpanded((prev) => !prev)} isExpanded={isExpanded} />
      <MenuListComponent isExpanded={isExpanded} width={width}>
        <MenuItem>	
          <MenuLink to='/' onClick={handleMenuClick}>
            Strona główna
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to='/blog' onClick={handleMenuClick}>
            Blog
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to='/contact' onClick={handleMenuClick}>
            Kontakt
          </MenuLink>
        </MenuItem>
    </MenuListComponent>
  </MenuWrapper>
  );
};
