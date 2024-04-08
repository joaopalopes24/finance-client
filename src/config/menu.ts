// ** External imports
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// ** Icons imports
import CubeSend from "mdi-material-ui/CubeSend";
import HomeCity from "mdi-material-ui/HomeCity";
import FileCabinet from "mdi-material-ui/FileCabinet";
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
    {
      id: "8548b796-7549-4502-9a36-1f336acd5b98",
      path: "/transactions",
      icon: CubeSend,
      title: "Transactions",
    },
    {
      id: "c34a9530-f876-4ebe-9b41-4bca3dcb1671",
      path: "/cost-centers",
      icon: HomeCity,
      title: "Cost Centers",
    },
    {
      id: "7a6cd874-6780-4913-92f0-d9959c75596a",
      path: "/account-plans",
      icon: FileCabinet,
      title: "Account Plans",
    },
  ];
};

export default menu;
