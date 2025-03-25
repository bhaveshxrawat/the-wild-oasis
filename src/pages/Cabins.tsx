import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "@/services/apiCabins";
import CabinTable from "@/features/cabins/CabinTable";

function Cabins() {
  useEffect(() => {
    getCabins().then((res) => console.log(res[0].image));
  }, []);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
        <CabinTable />
      </Row>
    </>
  );
}

export default Cabins;
