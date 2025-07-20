// import styled from 'styled-components';
import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { StyledTable as Table } from "../../ui/Table";
import styled from "styled-components";
import { useGetCabins } from "./useGetCabins";

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

// We want each table row to have a menu, and we only want one of them to be open at the same time. We also want this functionality to be reusable. We could add a openID state here to the table, but that wouldn't really be reusable... The best way is to use a compound component

// The hotel won't ever have a lot of cabins, so there is no need to paginate. So we will do no pagination, AND we will do filtering and sorting. So here we learn how to do it on the FRONT-END (later in the booking we will do the BACK-END version, which is more real world)

function CabinTable() {
  const { isPending, cabins } = useGetCabins();

  if (isPending) return <Spinner></Spinner>;

  return (
    <Table role="table" columns="9.6rem 0.8fr 2fr 1fr 1fr 3.2rem">
      <TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id}></CabinRow>
      ))}
    </Table>
  );
}

export default CabinTable;
