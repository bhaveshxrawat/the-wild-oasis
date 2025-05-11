import styled, { keyframes } from "styled-components";
import { BiLoader } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StyledSpinnerMini = styled.i`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${rotate} 1.5s infinite linear;
`;

const SpinnerMini = () => {
  return (
    <StyledSpinnerMini>
      <BiLoader />
    </StyledSpinnerMini>
  );
};

export default SpinnerMini;
