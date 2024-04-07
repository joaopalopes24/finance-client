// ** External Imports
import { useEffect } from "react";

// ** Internal Imports
import useMenu from "@/stores/menu";
import { MenuType } from "@/config/menu";
import MenuItems from "@/components/menu/menu-items";
import MenuDrawer from "@/components/menu/menu-drawer";
import MenuHeader from "@/components/menu/menu-header";

// ** MUI Imports
import List from "@mui/material/List";
import { Theme } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { styled, useMediaQuery } from "@mui/material";

interface Props {
  page?: string;
  menuItems: MenuType[];
}

const BoxShadow = styled(Box)<BoxProps>({
  top: 50,
  left: -8,
  zIndex: 2,
  height: 75,
  display: "none",
  position: "absolute",
  pointerEvents: "none",
  width: "calc(100% + 15px)",
  "&.d-block": {
    display: "block",
  },
});

const Menu = ({ page, menuItems }: Props) => {
  const menu = useMenu();

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  useEffect(() => {
    menu.setPage(page);
    menu.setHidden(hidden);
  }, [page, hidden]);

  return (
    <MenuDrawer>
      <MenuHeader />

      <BoxShadow />

      <Box sx={{ height: "100%", position: "relative", overflow: "hidden" }}>
        <Box sx={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <List sx={{ transition: "padding .25s ease", pr: 4.5 }}>
              <MenuItems menuItems={menuItems} />
            </List>
          </Box>
        </Box>
      </Box>
    </MenuDrawer>
  );
};

export default Menu;
