import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingID: number) =>
      updateBooking(bookingID, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/bookings");
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkOut, isCheckingOut };
}
