import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useAuth();

  if (isUserLoading) return null;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
