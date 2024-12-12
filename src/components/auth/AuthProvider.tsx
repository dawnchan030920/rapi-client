import { useState, useEffect, ReactNode } from "react";
import { AuthContext, UserProfile } from "./AuthContext";
import profile from "@/api/user/profile";
import loginFetch from "@/api/user/login";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | undefined>(undefined);

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  };

  const login = (username: string, password: string) => {
    loginFetch({ username, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        profile().then((res) => setUser(res));
      })
      .catch(() => setUser(undefined));
  };

  useEffect(() => {
    profile()
      .then((res) => setUser(res))
      .catch(() => setUser(undefined));
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
