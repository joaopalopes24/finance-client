"use client";

// ** External Imports
import Link from "next/link";
import { ReactNode } from "react";

// ** Internal Imports
import withAuth from "@/hocs/with-auth";
import ResendEmail from "./resend-email";
import SystemLayout from "@/layouts/system";

// ** MUI Imports
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";

type DescriptionProps = {
  title: string;
  color?: string;
  subtitle: ReactNode | string;
};

type ButtonLinkProps = {
  href: string;
  title: string;
  // prettier-ignore
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
};

const BoxSection = styled(Box)<BoxProps>({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const BoxItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "distance",
})<BoxProps & { distance?: boolean }>(({ theme, distance }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  ...(distance && { marginTop: theme.spacing(6) }),
}));

const ButtonLink = ({ color, title, href }: ButtonLinkProps) => {
  return (
    <Link passHref href={href} legacyBehavior scroll={false}>
      <Button color={color} variant="contained" sx={{ marginLeft: 2 }}>
        {title}
      </Button>
    </Link>
  );
};

const Description = ({ color, title, subtitle }: DescriptionProps) => {
  return (
    <Box sx={{ marginRight: 2 }}>
      <Typography color={color} variant="body1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>

      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

const Page = () => {
  return (
    <SystemLayout>
      <Card>
        <CardContent>
          <ResendEmail />

          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Profile
          </Typography>

          <Divider sx={{ marginY: 4 }} />

          <BoxSection>
            <BoxItem>
              <Description
                title="Profile"
                subtitle="Change your profile information."
              />

              <ButtonLink title="Change" href="/profile/change-profile" />
            </BoxItem>

            <BoxItem distance={true}>
              <Description
                title="Manage Password"
                subtitle="Change your password to keep your account secure."
              />

              <ButtonLink title="Change" href="/profile/change-password" />
            </BoxItem>

            <BoxItem distance={true}>
              <Description
                title="Two Factor Authentication"
                subtitle="Add additional security to your account."
              />

              <ButtonLink title="Change" href="/profile/two-factor" />
            </BoxItem>
          </BoxSection>

          <Typography variant="h5" sx={{ marginTop: 12, fontWeight: 600 }}>
            Support
          </Typography>

          <Divider sx={{ marginY: 4 }} />

          <BoxSection>
            <BoxItem>
              <Description
                color="error.main"
                title="Delete Account"
                subtitle="Once your account is deleted, all of your resources and data will be permanently deleted."
              />

              <ButtonLink color="error" title="Delete" href="/profile/delete-account" />
            </BoxItem>
          </BoxSection>
        </CardContent>
      </Card>
    </SystemLayout>
  );
};

export default withAuth(Page, {
  verified: false,
});
