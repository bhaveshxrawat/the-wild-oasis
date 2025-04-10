import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }: { options: Record<"value" | "label", string>[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    ></Select>
  );
}

export default SortBy;
