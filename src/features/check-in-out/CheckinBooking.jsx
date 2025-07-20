import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import BookingDataBox from "../bookings/BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useGetBooking } from "../bookings/useGetBooking.js";
import Checkbox from "../../ui/Checkbox.jsx";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers.js";
import { useCheckin } from "./useCheckin.js";
import { useGetSettings } from "../settings/useGetSettings.js";
import { useCheckOut } from "./useCheckOut.js";

const Box = styled.div`
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmed, setConfirmed] = useState(false);
  const [addBreakfasts, setAddBreakfast] = useState(false);
  const { isPending, booking } = useGetBooking();
  const { checkIn, isCheckIn } = useCheckin();
  const { settings = {}, isPending: isPendingSettings } = useGetSettings();
  const { checkOut, isCheckOut } = useCheckOut();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmed(booking?.isPaid ?? false), [booking]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking || {};

  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmed) return;
    if (addBreakfasts) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn(bookingId);
    }
  }

  if (isPending || isPendingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfasts}
            onChange={() => {
              setAddBreakfast((state) => !state);
              setConfirmed((confirmed) => !confirmed);
            }}
            id="breakfast"
          >
            want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmed}
          onChange={() => {
            setConfirmed((confirmed) => !confirmed);
          }}
          id="confirm"
          disabled={confirmed || isCheckIn}
        >
          i confirm that guest {guests.fullName} paid for breakfast the total
          amout{" "}
          {!addBreakfasts
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <button
          disabled={!confirmed || isCheckIn}
          style={{
            backgroundColor: "#4338ca",
            color: "white",
            padding: "10px",
            marginTop: "10px",
          }}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </button>

        <Button
          style={{
            padding: "10px",
            marginTop: "10px",
          }}
          variation="secondary"
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
