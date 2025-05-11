import styled, { css } from "styled-components";
import { JSX } from "react";

type RowType = "horizontal" | "vertical";
interface StyledRowType {
  $direction: RowType;
}

const StyledFormRow = styled.div<StyledRowType>`
  display: grid;
  align-items: center;
  ${(props) =>
    props.$direction === "horizontal"
      ? css`
          grid-template-columns: 24rem 1fr 1.2fr;
          gap: 2.4rem;
          &:first-child {
            padding-top: 0;
          }

          &:last-child {
            padding-bottom: 0;
          }

          &:not(:last-child) {
            border-bottom: 1px solid var(--color-grey-100);
          }

          &:has(button) {
            display: flex;
            justify-content: flex-end;
            gap: 1.2rem;
          }
        `
      : css`
          grid-template-columns: 1fr;
          grid-template-rows: auto auto;
          gap: 1rem;
        `}
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({
  label,
  error,
  children,
  $direction,
}: {
  label?: string;
  error?: string | undefined;
  children: JSX.Element;
  $direction?: RowType;
}) {
  return (
    <StyledFormRow $direction={$direction || "horizontal"}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
