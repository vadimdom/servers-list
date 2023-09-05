import { styled } from 'styled-components';

export const Loader = styled.div<{ $sizePX: number }>`
  border: ${({ $sizePX }) => ($sizePX / 5 > 12 ? 12 : $sizePX / 5)}px solid ${({ theme }) => theme.color.white};
  border-top: ${({ $sizePX }) => ($sizePX / 5 > 12 ? 12 : $sizePX / 5)}px solid ${({ theme }) => theme.color.darkBlue};
  border-radius: 50%;
  height: ${({ $sizePX }) => $sizePX}px;
  width: ${({ $sizePX }) => $sizePX}px;
  margin: auto;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
