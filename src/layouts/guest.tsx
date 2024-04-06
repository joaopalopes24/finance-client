// ** External Imports
import Link from "next/link";
import { ReactNode } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import MuiCard, { CardProps } from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";

export type HeaderProps = {
  title: string;
  subtitle: string;
};

type GuestLayoutProps = {
  children: ReactNode;
  header?: HeaderProps;
};

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

const GuestLayout = ({ children }: GuestLayoutProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          padding: theme.spacing(5),
        }}
      >
        <Card sx={{ zIndex: 1 }}>
          <CardContent
            sx={{
              padding: (theme) => `${theme.spacing(9, 6, 5)} !important`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginBottom: 6,
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Link href="/" passHref legacyBehavior>
                <MuiLink
                  variant="h5"
                  underline="none"
                  sx={{ fontWeight: 600, marginBottom: 1.5 }}
                >
                  Sunset Finance
                </MuiLink>
              </Link>

              <Typography
                variant="body2"
                sx={{ opacity: 0.7, textAlign: "center" }}
              >
                Proposed challenge for developer vacancy!
              </Typography>
            </Box>

            {children}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default GuestLayout;
