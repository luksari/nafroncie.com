import styled from 'styled-components';
import { media } from '../utils/media';

export const Content = styled.section`
  padding: 3rem 15%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.bgLight};
  z-index: 1;
  @media ${media.tablet} {
    padding: 1rem 10%;
  }
  @media ${media.phone} {
    padding: 1rem 10%;
  }
`;

export const PostsContent = styled.section`
  padding: 0 15%;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  z-index: 1;
  margin-top: -8rem;
  @media ${media.laptopS} {
    padding: 0 10%;
  }
  @media ${media.tablet} {
    padding: 1rem 10%;
    margin-top: -3.5rem;
    justify-content: center;
  }
  @media ${media.phone} {
    margin-top: -4rem;
    padding: 1rem 10%;
  }
`;

export const AboutMeContent = styled(Content)`
  padding: 3rem 20%;
`;
