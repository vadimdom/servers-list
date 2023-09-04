import { styled } from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px 8px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ErrorMessage = styled.span<{ $isVisible: boolean }>`
  height: 20px;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;

export const Input = styled.input`
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px;
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

  &:hover {
    background: ${({ theme }) => theme.color.lightBlue};
  }

  &:disabled {
    cursor: default;

    &:hover {
      background: ${({ theme }) => theme.color.blue};
    }
  }
`;
