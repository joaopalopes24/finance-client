// ** External Imports
import Menu from "mdi-material-ui/Menu";

// ** Internal Imports
import useMenu from "@/stores/menu";
import UserDropdown from "@/components/shared/user-dropdown";

// ** MUI Imports
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import MuiToolbar, { ToolbarProps } from "@mui/material/Toolbar";

const CustomNavBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  minHeight: 64,
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 6),
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: "100%",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  minHeight: "64px !important",
  padding: `${theme.spacing(0)} !important`,
  // prettier-ignore
  transition: "padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out",
}));

const NavBar = () => {
  const menu = useMenu();

  return (
    <CustomNavBar elevation={0} color="default" position="static">
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
            {menu.hidden && (
              <IconButton
                color="inherit"
                sx={{ ml: -2 }}
                onClick={menu.toggleVisible}
              >
                <Menu />
              </IconButton>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <UserDropdown />
          </Box>
        </Box>
      </Toolbar>
    </CustomNavBar>
  );
};

export default NavBar;
