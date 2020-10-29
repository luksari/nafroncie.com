import styled, { keyframes } from 'styled-components';
import Sigil from '@static/svgs/sigil.svg';

const slideFromTop = keyframes`
  0% {
    transform: translateY(-250px);
    opacity: 0;
  }
  65% {
    transform: translateY(20px);
    opacity: 1;
  }
  80% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);

  }
`;

export const LogoImage = styled(Sigil)`
  opacity: 1;
  z-index: 1;
`;

export const LogoSigil = styled(Sigil)`
  animation: ${slideFromTop} 0.6s ease-in-out;
  height: 100%;
  width: auto;
  margin: 0;
  z-index: 5;
`;
