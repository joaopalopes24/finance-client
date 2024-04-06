// ** External Imports
import { ReactNode } from "react";

type LayoutProps = {
  modal: ReactNode;
  children: ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { modal, children } = props;

  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default Layout;
