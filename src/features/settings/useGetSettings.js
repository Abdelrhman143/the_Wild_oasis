import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsApi } from "../../services/apiSettings";

export function useGetSettings() {
  const {
    isPending,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });
  return { isPending, settings, error };
}
