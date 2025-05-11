import { useUser } from "@/features/authentication/hooks/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  if (!user && !isLoading) navigate("/login", { replace: true });
  return children;
}
export default ProtectedRoute;
