// ** External Imports
import React from "react";

// ** Internal Imports
import useAuth from "@/hooks/auth";
import useConfirmed from "@/hooks/confirmed";

type Options = {
  confirm?: boolean;
  verified?: boolean;
};

const withAuth = (Component: React.FC, options: Options = {}) => {
  const Wrapper: React.FC = (props) => {
    // prettier-ignore
    const { confirm = false, verified = false } = options;

    const confirmed = useConfirmed();

    const auth = useAuth({ confirm, verified });

    if (!auth.user) {
      return null;
    }

    if (confirm && !confirmed.confirmed) {
      return null;
    }

    if (verified && !auth.user?.email_verified_at) {
      return null;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAuth;
