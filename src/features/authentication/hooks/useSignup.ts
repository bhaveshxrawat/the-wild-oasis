import { signup } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => signup({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "Account successfully created. Verify the email address to continue"
      );
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Couldn't create the account");
    },
  });
  return { signup: mutate, isSigningUp: isPending };
}
