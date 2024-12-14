import { useState, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext, UserProfile } from "./AuthContext";
import profile from "@/api/user/profile";
import loginFetch from "@/api/user/login";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<UserProfile | undefined>(undefined);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useQuery(["profile"], {
    queryFn: () => {
      setIsUserLoading(true);
      return profile();
    },
    onSuccess: (data) => setUser(data),
    onError: () => setUser(undefined),
  });

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  };

  const loginMutation = useMutation(loginFetch, {
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.token);
      queryClient.invalidateQueries(["profile"]);
      window.location.href = "/dashboard";
    },
    onError: () => setUser(undefined),
  });

  const login = (username: string, password: string) => {
    loginMutation.mutate({ username, password });
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
