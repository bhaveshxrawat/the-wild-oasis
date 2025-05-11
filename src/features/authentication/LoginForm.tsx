import { FormEvent, useState } from "react";
import Button from "@/ui/Button";
import Form from "@/ui/Form";
import Input from "@/ui/Input";
import FormRow from "@/ui/FormRow";
import { useLogin } from "./useLogin";
import SpinnerMini from "@/ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("mickey@example.com");
  const [password, setPassword] = useState("mickey@123");
  const { login, isLoggingIn } = useLogin();

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit} $type="regular">
      <FormRow label="Email address" $direction="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRow>
      <FormRow label="Password" $direction="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormRow>
      <FormRow>
        <Button $size="large" $variation="primary" disabled={isLoggingIn}>
          {!isLoggingIn ? "Login" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
