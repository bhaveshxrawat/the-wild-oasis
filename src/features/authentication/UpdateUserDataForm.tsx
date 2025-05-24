import { FormEvent, useState } from "react";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import { useUser } from "./hooks/useUser";
import { useUpdateUser } from "./hooks/useUpdateUser";

function UpdateUserDataForm() {
  const { user } = useUser();
  const { update, isUpdating } = useUpdateUser();
  const email = user?.email;
  const { fullName: currentFullName } = user?.user_metadata!;

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fullName)
      update(
        { fullName, avatar },
        {
          onSettled: () => {
            setFullName(currentFullName);
            setAvatar(null);
            e.currentTarget?.reset();
          },
        }
      );
  }

  return (
    <Form onSubmit={handleSubmit} $type="regular">
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setAvatar(e.target.files[0]);
            } else {
              setAvatar(null);
            }
          }}
        />
      </FormRow>
      <FormRow>
        <>
          <Button type="reset" $variation="secondary" disabled={isUpdating}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update account</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
