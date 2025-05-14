import { updateCurrentUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.error("User details updated.");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("User details couldn't be updated.");
    },
  });
  return { update: mutate, isUpdating: isPending };
}
