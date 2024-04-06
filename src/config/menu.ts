// ** External imports
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// ** Icons imports
import HomeOutline from "mdi-material-ui/HomeOutline";

type IconType = OverridableComponent<SvgIconTypeMap>;

export type MenuType = {
  id: string;
  path: string;
  title: string;
  icon?: IconType;
};

const menu = (): MenuType[] => {
  return [
    {
      id: "d29b0eec-709c-406c-9c75-05d74eca14c0",
      path: "/dashboard",
      icon: HomeOutline,
      title: "Dashboard",
    },
  ];
};

export default menu;
