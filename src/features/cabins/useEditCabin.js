import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin as createEditCabinApi } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  // edit
  const { isLoading: isLoadingEdit, mutate: editCabinMutate } = useMutation({
    /* 
    This function does exactly the same thing — 
    it takes an object with newCabin and id, and calls createCabinMutate with those arguments.
    function handleCabin({ newCabin, id }) {
          return createCabinMutate(newCabin, id);
    }
    why we do this ?? 
    React Query passes one argument to mutationFn
     */
    mutationFn: ({ newCabin, id }) => createEditCabinApi(newCabin, id),
    onSuccess: () => {
      toast.success("successfully edit the cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoadingEdit, editCabinMutate };
}
