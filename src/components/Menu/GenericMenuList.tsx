import React, { FC } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MobileMenu } from './MobileMenu';

const MenuListDesktop = styled(motion.ul)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  margin: 0;
`;

export const MenuListComponent: FC<{ isExpanded: boolean; width: number }> = ({
  width,
  children,
  isExpanded,
}) => {
  return (
    <>
      {width < 1025 ? (
        <MobileMenu isExpanded={isExpanded}>{children}</MobileMenu>
      ) : (
        <MenuListDesktop>{children}</MenuListDesktop>
      )}
    </>
  );
};
