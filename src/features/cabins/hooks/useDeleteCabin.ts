import { deleteCabin } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Done!");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin: mutate };
}
