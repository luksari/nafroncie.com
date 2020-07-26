import styled from 'styled-components';

export const Footer = styled.footer`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.bgLight};
  color: ${({ theme }) => theme.colors.darkText};
  align-self: flex-end;
  text-align: center;
  margin-top: auto;
  padding: 15px;
  span {
    font-size: 0.75rem;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
