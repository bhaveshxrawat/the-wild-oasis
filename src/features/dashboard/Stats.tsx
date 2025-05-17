import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "@/utils/helpers";

interface StatsProps {
  bookings: {
    created_at: string;
    totalPrice: number | null;
    extrasPrice: number | null;
  }[];
  confirmedStays: any[];
  numDays: number;
  cabinCount: number;
}

//TODO: Occupancy LEC: 401
function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  const numberBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice!, 0);
  const checkIns = confirmedStays.length;
  const occupatesRates =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numberBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy Rates"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupatesRates * 100) + "%"}
      />
    </>
  );
}
export default Stats;
