import { Link } from 'gatsby';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkText};
  transition: color 150ms ease-out;
  position: relative;
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
    background: ${({ theme }) => theme.colors.darkText};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.accentSecondary};
    &::after {
      background: ${({ theme }) => theme.colors.accentSecondary};
      transform: scaleX(1);
    }
  }
`;


export default StyledLink;
