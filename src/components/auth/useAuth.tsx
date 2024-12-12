import { useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

export const useAuth = (): AuthContextType => useContext(AuthContext);
