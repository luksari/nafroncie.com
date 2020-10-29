import styled from 'styled-components';
import { media } from '../utils/media';

export const Subline = styled.p<{ sectionTitle?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.darkText};
  ${({ sectionTitle }) => sectionTitle && 'text-align: center'};
  width: 100%;
  margin-bottom: 8px;
  @media ${media.tablet} {
    margin-bottom: 5px;
    width: 100%;
    font-size: 1.2rem;
  }
  @media ${media.phone} {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.smallest};
  }
`;
