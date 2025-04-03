import AddCabin from "@/features/cabins/AddCabin";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <CabinTable />
      <CreateCabinForm />
      <AddCabin />
    </>
  );
}

export default Cabins;
