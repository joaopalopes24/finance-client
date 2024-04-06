// ** External Imports
import useSWR from "swr";

// ** Internal Imports
import api from "@/repositories/api";
import { getData } from "@/utils/helpers";

type User = {
  id: number;
  name: string;
  email: string;
  has_two_factor: boolean;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

export type Session = {
  error: any;
  logout: () => void;
  mutate: () => void;
  user: User | undefined;
};

const useSession = (): Session => {
  const { data, error, mutate } = useSWR("/api/user", () => {
    return api.auth.me();
  });

  let user = getData(data) as User | undefined;

  const logout = async () => {
    if (!error) {
      await api.auth.logout().then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  return { user, error, logout, mutate };
};

export default useSession;
