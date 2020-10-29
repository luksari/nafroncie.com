import { lighten } from 'polished';
import styled from 'styled-components';

export const Button = styled.button<{ big?: boolean }>`
  background: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  border-radius: ${({ big }) => (big ? '1.5rem' : '1rem')};
  font-size: ${({ big, theme }) =>
    big ? theme.fontSize.medium : theme.fontSize.small};
  color: ${({ theme }) => theme.colors.lightText};
  font-weight: 700;
  padding: ${(props) => (props.big ? '0.35rem 1.6rem' : '0.25rem 1.5rem')};
  transition: all 150ms linear;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  &:hover {
    background: ${({ theme }) => lighten(0.15, theme.colors.accentSecondary)};
    transform: translateY(-2px);
  }
`;
export default Button;
