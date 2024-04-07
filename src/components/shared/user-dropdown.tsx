// ** External Imports
import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";
import LogoutVariant from "mdi-material-ui/LogoutVariant";
import AccountOutline from "mdi-material-ui/AccountOutline";

// Internal Imports
import useSession from "@/hooks/session";
import BoxMenu from "@/components/box/box-menu";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { TypographyProps } from "@mui/material/Typography";

const links = [
  {
    href: "/profile",
    title: "Profile",
    icon: AccountOutline,
  },
];

const UserName = styled(Typography)<TypographyProps>({
  marginLeft: 12,
  fontWeight: 600,
});

const BadgeSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = () => {
  const router = useRouter();

  const session = useSession();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) router.push(url);

    setAnchorEl(null);
  };

  const handleLogout = () => {
    session.logout();

    setAnchorEl(null);
  };

  return (
    <>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeSpan />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Avatar
          src="/avatar.png"
          alt="Profile Photo"
          sx={{ width: "2.5rem", height: "2.5rem" }}
        />
      </Badge>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeSpan />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar
                src="/avatar.png"
                alt="Profile Photo"
                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge>

            <UserName>{session.user?.name}</UserName>
          </Box>
        </Box>

        <Divider sx={{ mt: 0, mb: 1 }} />

        {links.map((link, index) => (
          <MenuItem key={index} onClick={() => handleDropdownClose(link.href)}>
            <BoxMenu>
              <link.icon /> {link.title}
            </BoxMenu>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem onClick={() => handleLogout()}>
          <BoxMenu>
            <LogoutVariant /> Log Out
          </BoxMenu>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserDropdown;
