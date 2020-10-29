import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

export const LinkUnderlineStyles = (color: string, colorHover: string) => css`
  transition: color 150ms ease-out;
  position: relative;
  color: ${color};
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    transform: scaleX(0);
    transform-origin: 0 0;
    transition: transform 150ms ease-out;
    background: ${color};
  }
  &:hover {
    color: ${colorHover};
    &::after {
      background: ${colorHover};
      transform: scaleX(1);
    }
  }
`;

export const StyledLink = styled(Link)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkText};
  ${({ theme }) =>
    LinkUnderlineStyles(theme.colors.darkText, theme.colors.accentSecondary)};
`;
