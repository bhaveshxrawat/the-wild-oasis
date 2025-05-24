import supabase, { supabaseUrl } from "./supabase";

export async function signup({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  fullName?: string;
  avatar?: File | null;
  password?: string;
}) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  else updateData = {};

  const { data: postUpdateData, error: postUpdateError } =
    await supabase.auth.updateUser(updateData);
  if (postUpdateError) throw new Error(postUpdateError.message);
  if (!avatar) return postUpdateData;

  const fileName = `avatar-${postUpdateData.user.id}-${Math.random() * 10}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  const { data: postAvatarData, error: postAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (postAvatarError) throw new Error(postAvatarError.message);
  return postAvatarData;
}
