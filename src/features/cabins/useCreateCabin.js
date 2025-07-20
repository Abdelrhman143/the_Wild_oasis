import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  // create
  const { isLoading: isLoadingAdd, mutate: createCabinMutate } = useMutation({
    mutationFn: createEditCabinApi,
    onSuccess: () => {
      toast.success("successfully create the cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoadingAdd, createCabinMutate };
}
