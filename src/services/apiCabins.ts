import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

async function createCabin(newCabin: CabinProps) {
  let imgPath: string;
  const imgName = `${Math.random()}-${
    typeof newCabin.image === "object" ? newCabin.image[0].name : newCabin.name
  }`.replaceAll("/", "");
  imgPath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;
  if (
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl)
  ) {
    imgPath = newCabin.image;
  }
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imgPath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  if (
    typeof newCabin.image === "string" &&
    newCabin.image.startsWith(supabaseUrl)
  )
    return data;

  const { error: storageErr } = await supabase.storage
    .from("cabin-images")
    .upload(imgName, newCabin.image[0]);

  if (storageErr) {
    deleteCabin(data[0].id);
    throw new Error("Cabin image could be uploaded.");
  }
  return data;
}

export { getCabins, deleteCabin, createCabin };
