"use client";

// ** External Imports
import Link from "next/link";

// ** Internal Imports
import useSession from "@/hooks/session";
import GuestLayout from "@/layouts/guest";

// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Page = () => {
  const session = useSession();

  return (
    <GuestLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body2"
          sx={{ opacity: 0.7, textAlign: "center", marginBottom: 6 }}
        >
          This challenge was tackled using React in conjunction with Next.js.
          Although frontend development isn&rsquo;t my strongest suit, I
          endeavored to apply all the knowledge I have garnered. Thank you in
          advance for the opportunity.
        </Typography>

        {session.user && (
          <Link href="/dashboard" passHref legacyBehavior>
            <Button fullWidth variant="contained">
              Dashboard
            </Button>
          </Link>
        )}
        {!session.user && (
          <Link href="/login" passHref legacyBehavior>
            <Button fullWidth variant="contained">
              Sign In
            </Button>
          </Link>
        )}
      </Box>
    </GuestLayout>
  );
};

export default Page;
