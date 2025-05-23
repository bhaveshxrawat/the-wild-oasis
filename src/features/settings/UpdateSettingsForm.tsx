import FormRow from "@/ui/FormRow";
import Form from "@/ui/Form";
import Input from "@/ui/Input";
import { useSettings } from "./hooks/useSettings";
import Spinner from "@/ui/Spinner";
import { useUpdateSetting } from "./hooks/useEditSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();
  if (!settings) return null;
  const {
    minBookingLength,
    maxBookingLength,
    breakfastPrice,
    maxGuestsPerBooking,
  } = settings;
  if (isLoading) return <Spinner />;
  function handleUpdate(e: React.FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;
    if (value.trim().length === 0) return;
    updateSetting({ [field]: value });
  }
  return (
    <Form $type="regular">
      <FormRow label="Minimum nights/booking" error="">
        <Input
          type="number"
          disabled={isUpdating}
          id="min-nights"
          defaultValue={minBookingLength ?? ""}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking" error="">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          defaultValue={maxBookingLength ?? ""}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking" error="">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-guests"
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          defaultValue={maxGuestsPerBooking ?? ""}
        />
      </FormRow>
      <FormRow label="Breakfast price" error="">
        <Input
          type="number"
          disabled={isUpdating}
          id="breakfast-price"
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          defaultValue={breakfastPrice ?? ""}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
