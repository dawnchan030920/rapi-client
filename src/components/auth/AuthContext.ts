import { ID } from "@/api/schema/id";
import { createContext } from "react";

export type UserProfile = {
  id: ID;
  email: string;
  username: string;
};

export type AuthContextType = {
  user: UserProfile | undefined;
  logout: () => void;
  login: (username: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  logout: () => {},
  login: () => Promise.resolve(),
});
