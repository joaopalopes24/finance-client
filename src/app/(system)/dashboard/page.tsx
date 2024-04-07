"use client";

// ** Internal Imports
import withAuth from "@/hocs/with-auth";
import SystemLayout from "@/layouts/system";

// ** MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Page = () => {
  return (
    <SystemLayout page="d29b0eec-709c-406c-9c75-05d74eca14c0">
      <Card>
        <CardContent>
          <h1>Dashboard</h1>
        </CardContent>
      </Card>
    </SystemLayout>
  );
};

export default withAuth(Page);
