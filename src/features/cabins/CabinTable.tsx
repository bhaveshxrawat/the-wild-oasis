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
  const sortBy = searchParams.get("sortBy") || "startData-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    const fieldName = field as keyof typeof a;
    if (typeof a[fieldName] === "string") {
      return (
        String(a[fieldName]).localeCompare(String(b[fieldName])) * modifier
      );
    }
    return (Number(a[fieldName]) - Number(b[fieldName])) * modifier;
  });
  if (filterValue === "all") filteredCabins = cabins;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body<CabinProps>
          // @ts-expect-error db-local discrepancy
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
