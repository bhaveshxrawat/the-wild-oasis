import styled, { css } from "styled-components";

type RowProps = { type: "horizontal" | "vertical" };

const types = {
  horizontal: css`
    justify-content: space-between;
    align-items: center;
  `,
  vertical: css`
    flex-direction: column;
  `,
};

const Row = styled.div<RowProps>`
  display: flex;
  gap: 1.6rem;
  ${(props: RowProps) => types[props.type]}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
