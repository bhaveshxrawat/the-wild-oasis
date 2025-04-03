import { formatCurrency } from "@/utils/helpers";
import styled from "styled-components";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./hooks/useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: var(--gtc);
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: CabinProps }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();
  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  function handleDuplicateCabin() {
    // @ts-expect-error local-db discrepancy
    createCabin({
      maxCapacity,
      regularPrice,
      discount,
      image,
      name: `Copy of ${name}`,
      description: cabin.description,
    });
  }
  return (
    <TableRow role="row">
      <Img
        src={
          typeof cabin.image === "object" ? cabin.image[0].name : cabin.image
        }
        alt=""
      />
      <Cabin>{name}</Cabin>
      <div>
        Ideal for {maxCapacity} {"guest(s)"}
      </div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div className="flex items-center gap-1">
        <button onClick={handleDuplicateCabin}>
          <HiSquare2Stack />
        </button>
        <button onClick={() => deleteCabin(cabinID)} disabled={isDeleting}>
          <HiTrash />
        </button>
      </div>
    </TableRow>
  );
}

export default CabinRow;
