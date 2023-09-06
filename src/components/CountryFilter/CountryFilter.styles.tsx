import { styled } from 'styled-components';
import { ReactComponent as ClearIcon } from './clear.svg';

export const CountriesContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

export const ClearImage = styled(ClearIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const FlagContainer = styled.img<{ $isSelected: boolean }>`
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  opacity: ${({ $isSelected }) => ($isSelected ? '1' : '0.5')};
  border: 2px solid ${({ theme, $isSelected }) => ($isSelected ? theme.color.green : theme.color.black)};
`;

export const FlagsContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;
