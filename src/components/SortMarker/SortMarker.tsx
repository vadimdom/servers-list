import { styled } from 'styled-components';

import { ReactComponent as ArrowTop } from './arrow-top.svg';

const SortMarkerContainer = styled.div<{ $isAsc: boolean }>`
  transform: ${({ $isAsc }) => ($isAsc ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: all 0.2s linear;
`;

const ArrowIcon = styled(ArrowTop)`
  width: 16px;
  height: 16px;
`;

export const SortMarker = ({ rule }: { rule: 'asc' | 'desc' | null }) => {
  if (!rule) return null;

  return (
    <SortMarkerContainer $isAsc={rule === 'asc'}>
      <ArrowIcon />
    </SortMarkerContainer>
  );
};
