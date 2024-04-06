const SIZE = 260;

// ** External Imports
import { ReactNode } from "react";

// ** Internal Import
import useMenu from "@/stores/menu";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";
import { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer";

interface Props {
  children: ReactNode;
}

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>(
  ({ theme }) => ({
    width: SIZE,
    overflowX: "hidden",
    transition: "width .25s ease-in-out",
    "& ul": {
      listStyle: "none",
    },
    "& .MuiListItem-gutters": {
      paddingLeft: 4,
      paddingRight: 4,
    },
    "& .MuiDrawer-paper": {
      borderRight: 0,
      overflowX: "hidden",
      backgroundColor: theme.palette.background.default,
      transition: "width .25s ease-in-out, box-shadow .25s ease-in-out",
    },
  }),
);

const MenuDrawer = ({ children }: Props) => {
  const menu = useMenu();

  const MobileDrawerProps = {
    open: menu.visible,
    onOpen: () => menu.setVisible(true),
    onClose: () => menu.setVisible(false),
    ModalProps: {
      keepMounted: true,
    },
  };

  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
  };

  return (
    <SwipeableDrawer
      PaperProps={{ sx: { width: SIZE } }}
      variant={menu.hidden ? "temporary" : "permanent"}
      {...(menu.hidden ? MobileDrawerProps : DesktopDrawerProps)}
    >
      {children}
    </SwipeableDrawer>
  );
};

export default MenuDrawer;
