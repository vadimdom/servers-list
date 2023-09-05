import { styled } from 'styled-components';
import { DEVICE_SIZES } from '../../constants';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  border-radius: 8px;
  padding: 16px 8px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: rgba(79, 192, 249, 0.24) 0px 3px 8px;
  transition: all 0.2s linear;

  &:hover {
    box-shadow: rgba(79, 192, 249, 0.5) 0px 10px 20px;
    background: ${({ theme }) => theme.color.white};
  }

  @media (min-width: ${DEVICE_SIZES.tablet}) {
    &:hover {
      padding: 20px 12px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormCaption = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.darkBlue};
`;

export const ErrorMessage = styled.span<{ $isVisible: boolean }>`
  height: 20px;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  color: ${({ theme }) => theme.color.red};
  font-size: 12px;
`;

export const Input = styled.input<{ $isWithError: boolean }>`
  border: 1px solid ${({ $isWithError, theme }) => ($isWithError ? theme.color.red : theme.color.black)};
  border-radius: 8px;
  padding: 8px;
  transition: all 0.3s linear;
  background: transparent;
`;

export const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.color.blue};
  border-radius: 8px;
  padding: 8px;
  height: 40px;
  color: ${({ theme }) => theme.color.white};
  font-weight: bold;
  background: ${({ theme }) => theme.color.blue};
  transition: all 0.3s linear;
  cursor: pointer;
  box-shadow: rgba(79, 192, 249, 0.24) 0px 3px 8px;

  &:hover {
  }

  &:hover {
    background: ${({ theme }) => theme.color.lightBlue};
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;

    &:hover {
      background: ${({ theme }) => theme.color.blue};
    }
  }
`;
