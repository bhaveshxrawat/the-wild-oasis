import styled, { css } from "styled-components";

type HeadingProps = { as: "h1" | "h2" | "h3" | "h4" };

const alias = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
  `,
  h3: css`
    font-size: 2rem;
    font-weight: 600;
  `,
  h4: css`
    font-size: 3rem;
    font-weight: 600;
  `,
};

const Heading = styled.h1<HeadingProps>`
  ${(props: HeadingProps) => alias[props.as]}
`;

export default Heading;
