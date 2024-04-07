// ** External Imports
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// ** Internal Imports
import useSession, { Session } from "@/hooks/session";

const useGuest = (redirectTo?: string): Session => {
  const router = useRouter();

  const session = useSession();

  useEffect(() => {
    if (session.user) {
      router.push(redirectTo || "/dashboard");
    }
  }, [session]);

  return { ...session };
};

export default useGuest;
