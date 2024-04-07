// External Imports
import { ReactNode } from "react";
import CircleOutline from "mdi-material-ui/CircleOutline";

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
      {icon ? <IconTag /> : <CircleOutline fontSize="small" />}
    </ListItemIcon>
  );
};

export default ItemIcon;
