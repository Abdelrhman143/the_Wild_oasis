import styled from "styled-components";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import { useRecentBookings } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import { useGetCabins } from "../cabins/useGetCabins";
import Stats from "./Stats";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending, bookings } = useRecentBookings();
  const {
    isPending: isPendingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { isPending: isPendingCabins, cabins } = useGetCabins();

  if (isPending || isPendingStays || isPendingCabins) return <Spinner />;

  console.log("bookings", bookings);
  console.log("confirmedStays", confirmedStays);
  console.log("numDays", numDays);
  console.log("cabinCount", cabins);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays}></SalesChart>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
