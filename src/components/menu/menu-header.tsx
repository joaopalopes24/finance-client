// ** External Import
import Link from "next/link";
import AlphaSBox from "mdi-material-ui/AlphaSBox";

// ** Internal Import
import appConfig from "@/config/app";

// ** MUI Imports
import Box, { BoxProps } from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";

const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: theme.spacing(4.5),
  transition: "padding .25s ease-in-out",
}));

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  lineHeight: "normal",
  textTransform: "uppercase",
  color: theme.palette.text.primary,
  transition: "opacity .25s ease-in-out, margin .25s ease-in-out",
}));

const LinkStyled = styled("a")({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

const MenuHeader = () => {
  const theme = useTheme();

  return (
    <MenuHeaderWrapper sx={{ pl: 6 }}>
      <Link href="/" passHref legacyBehavior>
        <LinkStyled>
          <AlphaSBox color="primary" fontSize="large" />

          <HeaderTitle variant="body1" sx={{ ml: 3 }}>
            {appConfig.name}
          </HeaderTitle>
        </LinkStyled>
      </Link>
    </MenuHeaderWrapper>
  );
};

export default MenuHeader;
