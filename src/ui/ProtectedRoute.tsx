import { useUser } from "@/features/authentication/hooks/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  useEffect(() => {
    if (!user && !isLoading) navigate("/login", { replace: true });
  }, [user, isLoading]);
  if (isLoading) return <Spinner />;
  return children;
}
export default ProtectedRoute;
