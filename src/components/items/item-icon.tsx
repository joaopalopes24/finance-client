// External Imports
import { ReactNode } from "react";

// ** MUI Imports
import ListItemIcon from "@mui/material/ListItemIcon";

const ItemIcon = ({ icon }: any) => {
  const IconTag: ReactNode = icon;

  return (
    <ListItemIcon
      sx={{
        color: "text.primary",
        transition: "margin .25s ease-in-out",
      }}
    >
      {/* @ts-ignore */}
      {icon && <IconTag />}
    </ListItemIcon>
  );
};

export default ItemIcon;
