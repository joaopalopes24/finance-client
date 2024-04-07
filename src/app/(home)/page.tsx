"use client";

// ** External Imports
import Link from "next/link";

// ** Internal Imports
import HomeLayout from "@/layouts/home";
import useSession from "@/hooks/session";

// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Page = () => {
  const session = useSession();

  return (
    <HomeLayout>
      <Box
        sx={{ display: "flex", padding: 6, justifyContent: "space-between" }}
      >
        {" "}
        {session.user && (
          <Link href="/dashboard">
            <Button variant="contained">Dashboard</Button>
          </Link>
        )}
        {!session.user && (
          <Link href="/login">
            <Button variant="contained">Sign In</Button>
          </Link>
        )}
      </Box>
    </HomeLayout>
  );
};

export default Page;
