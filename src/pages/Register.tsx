import register from "@/api/user/register";
import RegisterRender from "@/components/pages/Register";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: register,
  });

  const handleSubmit = () => {
    mutation.mutate({ username, password, email });
  };

  return (
    <RegisterRender
      username={username}
      password={password}
      email={email}
      isLoading={mutation.isLoading}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onEmailChange={setEmail}
      onSubmit={handleSubmit}
    />
  );
}
