import styled from "styled-components";
import { useRecentBookings } from "./hooks/useRecentBookings";
import Spinner from "@/ui/Spinner";
import { useRecentStays } from "./hooks/useRecentStays";
import Stats from "./Stats";
import Empty from "@/ui/Empty";
import { useCabins } from "../cabins/hooks/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
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
    </StyledDashboardLayout>
  );
}
export default DashboardLayout;
