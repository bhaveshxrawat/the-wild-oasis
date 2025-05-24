import styled from "styled-components";
import { useRecentBookings } from "./hooks/useRecentBookings";
import Spinner from "@/ui/Spinner";
import { useRecentStays } from "./hooks/useRecentStays";
import Stats from "./Stats";
import Empty from "@/ui/Empty";
import { useCabins } from "../cabins/hooks/useCabins";
import SalesChart from "./SalesChart";
// import DurationChart from "./DurationChart";
// import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoadingRecentBookings } = useRecentBookings();
  const { stays, confirmedStays, isLoadingRecentStays, numDays } =
    useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingRecentBookings || isLoadingRecentStays || isLoadingCabins)
    return <Spinner />;
  if (!bookings) return <Empty resource="bookings" />;
  if (!stays || !confirmedStays) return <Empty resource="stays" />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins!.length}
      />
      {/* <TodayActivity /> */}
      {/* <DurationChart confirmedStays={confirmedStays} /> */}
      <SalesChart numDays={numDays} bookings={bookings} />
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
