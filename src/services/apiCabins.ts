import supabase from "./supabase";

async function getCabins(): Promise<CabinProps[]> {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export { getCabins };
