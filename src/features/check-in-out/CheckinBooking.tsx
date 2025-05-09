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
import { useCheckIn } from "./hooks/useCheckIn";
import { useSettings } from "../settings/hooks/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckIn();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking) return null;

  const {
    id: bookingID,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice && numGuests && numNights
      ? settings.breakfastPrice * numGuests * numNights
      : 0;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingID,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: (totalPrice ?? 0) + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingID, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingID}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that {guests?.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice ?? 0)
            : `${formatCurrency(
                (totalPrice ?? 0) + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice ?? 0)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
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
