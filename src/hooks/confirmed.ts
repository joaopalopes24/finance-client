// ** External Imports
import useSWR from "swr";

// ** Internal Imports
import api from "@/repositories/api";
import { getDataKey } from "@/utils/helpers";

export type Confirmed = {
  error: any;
  confirmed: boolean;
  mutate: () => void;
};

const useConfirmed = (): Confirmed => {
  const { data, error, mutate } = useSWR("/confirmed-status", () => {
    return api.auth.confirmedStatus();
  });

  let confirmed = (getDataKey(data, "confirmed") as boolean) || false;

  return { confirmed, error, mutate };
};

export default useConfirmed;
