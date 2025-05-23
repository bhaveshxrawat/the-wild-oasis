import { getStaysTodayActivity } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivity() {
  const { data, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities: data, isLoadingTodaysActivity: isLoading };
}
