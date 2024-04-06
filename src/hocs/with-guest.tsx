// ** External Imports
import React from "react";

// ** Internal Imports
import useGuest from "@/hooks/guest";

type Options = {
  redirectTo?: string;
};

const withGuest = (Component: React.FC, options: Options = {}) => {
  const Wrapper: React.FC = (props) => {
    const { redirectTo } = options;

    const guest = useGuest(redirectTo);

    if (!!guest.user || !guest.error) {
      return null;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default withGuest;
