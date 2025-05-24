import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/features/authentication/hooks/useUser";
import Spinner from "./Spinner";
import { useQueryClient } from "@tanstack/react-query";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
    }
    if (!isLoading && user) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] !== "user";
        },
      });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  return <>{children}</>;
}
