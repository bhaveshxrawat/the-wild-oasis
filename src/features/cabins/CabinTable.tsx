import { getCabins } from "@/services/apiCabins";
import Spinner from "@/ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import CabinRow from "./CabinRow";

const Table = styled.div`
  --gtc: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: var(--gtc);
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  if (isLoading) return <Spinner />;
  return (
    <Table role="table">
      <TableHeader role="row">
        <div className=""></div>
        <div className="">Cabin</div>
        <div className="">Capacity</div>
        <div className="">Price</div>
        <div className="">Discount</div>
        <div className=""></div>
      </TableHeader>
      {cabins?.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;
