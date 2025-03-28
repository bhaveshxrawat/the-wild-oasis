import styled from "styled-components";

import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "@/services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "@/ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinPropsLocal>();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin created!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function onSubmit(data: CabinPropsLocal) {
    mutate(data);
    // console.log(data);
  }
  function onError(errors: any) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
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

      <FormRow label="Cabin photo" error="">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow label="" error="">
        <>
          <Button size="medium" variation="secondary" type="reset">
            Cancel
          </Button>
          <Button size="medium" variation="primary" disabled={isPending}>
            Edit cabin
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
