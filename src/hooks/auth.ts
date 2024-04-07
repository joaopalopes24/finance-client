// ** External Imports
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

// ** Internal Imports
import useConfirmed from "@/hooks/confirmed";
import useSession, { Session } from "@/hooks/session";

type Options = {
  confirm: boolean;
  verified: boolean;
};

const useAuth = (options: Options): Session => {
  const { confirm, verified } = options;

  const router = useRouter();

  const session = useSession();

  const pathname = usePathname();

  const confirmed = useConfirmed();

  useEffect(() => {
    if (session.user?.email_verified_at && pathname === "/verify-email") {
      router.push("/dashboard");
    }

    if (session.error) {
      session.logout();
    }

    if (confirm && session.user && !confirmed.confirmed) {
      router.push("/confirm-password");
    }

    if (verified && session.user && !session.user.email_verified_at) {
      router.push("/verify-email");
    }
  }, [session]);

  return { ...session };
};

export default useAuth;
