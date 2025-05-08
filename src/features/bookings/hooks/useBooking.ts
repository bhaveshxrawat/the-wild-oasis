import { getBooking } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingID } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingID],
    queryFn: () => getBooking(Number(bookingID)),
    retry: false,
  });
  return { isLoading, booking, error };
}
