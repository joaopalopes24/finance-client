// ** External Imports
import { ReactNode } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

type BoxMenuProps = {
  children: ReactNode;
};

const CustomBox = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  color: "text.primary",
  textDecoration: "none",
  "& svg": {
    marginRight: 2,
    color: "text.secondary",
  },
});

const BoxMenu = ({ children }: BoxMenuProps) => {
  return <CustomBox>{children}</CustomBox>;
};

export default BoxMenu;
