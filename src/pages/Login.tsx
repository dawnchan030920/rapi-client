import { useAuth } from "@/components/auth/useAuth";
import LoginRender from "@/components/pages/Login";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(username, password);
  };

  return (
      <LoginRender
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        onLogin={handleLogin}
      />
  );
}
