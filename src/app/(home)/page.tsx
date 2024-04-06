"use client";

// ** External Imports
import Link from "next/link";

// ** Internal Imports
import HomeLayout from "@/layouts/home";
import useSession from "@/hooks/session";

// ** MUI Imports
import Button from "@mui/material/Button";

const Page = () => {
  const session = useSession();

  return (
    <HomeLayout>
      <div className="flex p-6 space-x-4">
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
      </div>
    </HomeLayout>
  );
};

export default Page;
