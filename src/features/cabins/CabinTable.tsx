import Spinner from "@/ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "@/ui/Table";
import Menus from "@/ui/Menus";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div className=""></div>
          <div className="">Cabin</div>
          <div className="">Capacity</div>
          <div className="">Price</div>
          <div className="">Discount</div>
          <div className=""></div>
        </Table.Header>
        <Table.Body<CabinProps>
          // @ts-expect-error db-local discrepancy
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
