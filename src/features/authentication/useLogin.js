import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const { isPending: isLoging, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      toast.success("successfully login");
      navigate("/");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("email or password provided are inccorect");
    },
  });
  return { isLoging, login };
}
