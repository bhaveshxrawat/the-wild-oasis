import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "@/ui/FormRow";
import { useCreateCabin } from "./hooks/useCreateCabin";

function CreateCabinForm({
  cancelHandler,
}: {
  cancelHandler?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}) {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinProps>();
  const { errors } = formState;
  const { createCabin, isPending } = useCreateCabin();
  function onSubmit(data: CabinProps) {
    createCabin(data, {
      onSuccess: () => {
        reset();
        cancelHandler ? cancelHandler(false) : undefined;
      },
    });
    // console.log(data);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      $type={cancelHandler ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value needs to be 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum value needs to be 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount must be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="" error="">
        <>
          <Button
            $size="medium"
            $variation="secondary"
            type="reset"
            onClick={cancelHandler ? () => cancelHandler(false) : undefined}
          >
            Cancel
          </Button>
          <Button $size="medium" $variation="primary" disabled={isPending}>
            Add cabin
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
