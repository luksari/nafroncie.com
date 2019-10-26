import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { media } from '../utils/media';

interface IProps {
  readonly expanded: boolean;
  // tslint:disable-next-line: no-mixed-interface
  readonly handleExpanded: (expanded: boolean) => void;
}

const ButtonContainer = styled.button`
  z-index: 2;
  background: none;
  cursor: pointer;
  outline: none;
  border: none;
  height: 50px;
  width: 50px;
  display: none;
  @media ${media.tablet} {
    display: block;
    transform: scale(1.2);
  }
  @media ${media.phone} {
    display: block;
    transform: scale(1);
  }
`;
const Burger = styled.div<{ readonly expanded: boolean }>`
  width: 100%;
  height: 3px;
  background: ${props => props.theme.gradients.primary(90)};
  position: relative;
  &::before,
  &::after {
    transition: transform 0.2s, background 0.5s;
    content: '';
    width: 100%;
    position: absolute;
    height: 3px;
    left: 0;
    background: ${props => props.theme.gradients.primary(90)};
  }
  &::before {
    top: -9px;
  }
  &::after {
    top: 9px;
  }
  ${props =>
    props.expanded &&
    css`
      height: 0;
      &::before,
      &::after {
        top: 0;
        background: ${p => p.theme.gradients.warning(90)};
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    `}
`;
export const BurgerButton: FC<IProps> = ({ expanded, handleExpanded }) => (
  <ButtonContainer onClick={() => handleExpanded(!expanded)}>
    <Burger expanded={expanded} />
  </ButtonContainer>
);
export default BurgerButton;
