import { styled } from 'styled-components';

import { DEVICE_SIZES } from '../constants';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s linear;
  min-height: 100vh;

  @media (max-width: ${DEVICE_SIZES.tablet}) {
    align-items: start;
    padding-top: 30px;
  }
`;
