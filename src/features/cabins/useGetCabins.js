import { useQuery } from "@tanstack/react-query";
import { getCabins as getCabinsApi } from "../../services/apiCabins";

export function useGetCabins() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsApi,
  });

  return { isPending, cabins, error };
}
