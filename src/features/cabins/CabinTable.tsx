import Spinner from "@/ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "@/ui/Empty";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;
  if (!cabins || cabins.length === 0) return <Empty resource="cabins" />;
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  switch (true) {
    case filterValue === "no-discount":
      filteredCabins = cabins.filter((cabin) => !cabin.discount);
      break;
    case filterValue === "with-discount":
      filteredCabins = cabins.filter(
        (cabin) => cabin.discount && cabin.discount > 0
      );
      break;
    default:
      filteredCabins = cabins;
      break;
  }
  if (filterValue === "all") filteredCabins = cabins;
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
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
