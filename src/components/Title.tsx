import styled, { css, keyframes } from 'styled-components';
import { media } from '../utils/media';

const slideFromLeft = keyframes`
  0% {
    transform: translateX(-250px);
    opacity: 0;
  }
  65% {
    transform: translateX(45px);
    opacity: 1;
  }
  80% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(0px);

  }
`;

export const Title = styled.h3`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`;

export const AnimatedTitle = styled(Title)<{ delay: number }>`
  transition: color 0.15s, transform 0.15s;
  display: flex;
  justify-content: center;
  &:focus,
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(150px);
  }
  ${({ delay }) => css`
    animation: ${slideFromLeft} 0.65s linear ${delay * 0.13}s 1 both;
  `};
`;

export const PageTitle = styled.h1`
  font-size: 8rem;
  margin-bottom: 0;
  z-index: 1;
  color: ${({ theme }) => theme.colors.darkText};
  text-align: start;
  @media ${media.tablet} {
    font-size: 4.2rem;
  }
  @media ${media.phone} {
    font-size: 3.3rem;
    text-align: center;
  }
`;

export const PostTitle = styled(PageTitle)`
  text-align: center;
`;

export const PageTitleSecondary = styled.h2`
  font-family: 'Fira sans', sans-serif;
  font-weight: 900;
  font-size: 1.4rem;
  z-index: 1;
  margin: 0;
  color: ${({ theme }) => theme.colors.darkText};
  @media ${media.tablet} {
    font-size: 1.5rem;
  }
  @media ${media.phone} {
    font-size: 1.5rem;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 3rem;
  align-self: flex-start;
  justify-self: flex-start;
  margin-right: auto;
  color: ${({ theme }) => theme.colors.darkText};
  margin-bottom: 35px;
  @media ${media.tablet} {
    font-size: 2rem;
  }
  @media ${media.phone} {
    font-size: 1.6rem;
  }
`;
