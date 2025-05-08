import styled from "styled-components";
import { useEffect, useState } from "react";
import BookingDataBox from "@/features/bookings/BookingDataBox";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import ButtonText from "@/ui/ButtonText";

import { useMoveBack } from "@/hooks/useMoveBack";
import { useBooking } from "../bookings/hooks/useBooking";
import Spinner from "@/ui/Spinner";
import Checkbox from "@/ui/Checkbox";
import { formatCurrency } from "@/utils/helpers";
import { useChecking } from "./hooks/useChecking";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useChecking();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return null;

  const {
    id: bookingID,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin(bookingID);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingID}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests?.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice ?? 0)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingID}
        </Button>
        <Button onClick={moveBack} $variation="secondary">
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
