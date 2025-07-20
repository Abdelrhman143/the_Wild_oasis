import styled from "styled-components";
// import BookingRow from "../bookings/BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useGetBookings } from "./useGetBookings";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import BookingRow from "./BookingRow";
import Pagination from "../../ui/Pagination";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function BookingTable() {
  const { bookings, isPending, count } = useGetBookings();

  if (isPending) return <Spinner />;
  console.log(bookings);
  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count}></Pagination>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
