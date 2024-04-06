// ** External Imports
import { ReactNode } from "react";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

type HomeLayoutProps = {
  children: ReactNode;
};

const BoxStyled = styled(Box)<BoxProps>(() => ({
  minHeight: "100vh",
  overflowX: "hidden",
  position: "relative",
}));

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return <BoxStyled>{children}</BoxStyled>;
};

export default HomeLayout;
