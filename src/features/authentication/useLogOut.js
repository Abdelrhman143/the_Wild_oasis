import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logOut as logOutApi } from "../../services/apiAuth";
export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending, mutate: logout } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.cancelQueries();
      navigate("/login", { replace: true });
    },
  });

  return { isPending, logout };
}
