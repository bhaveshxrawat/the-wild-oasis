import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }

  &[type="number"]::-webkit-inner-spin-button {
    display: none;
    appearance: none;
  }

  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default Input;
