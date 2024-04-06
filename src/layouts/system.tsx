// ** External Imports
import { ReactNode } from "react";

// ** Internal Imports
import menuItems from "@/config/menu";
import Menu from "@/components/menu/menu";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";
import ScrollToTop from "@/components/shared/scroll-to-top";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

type SystemLayoutProps = {
  page?: string;
  children: ReactNode;
};

const LayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
});

const MainWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  marginLeft: "auto",
  marginRight: "auto",
  flexDirection: "column",
  [theme.breakpoints.up("xl")]: {
    maxWidth: 1536,
  },
}));

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(6),
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const SystemLayout = ({ page, children }: SystemLayoutProps) => {
  return (
    <>
      <LayoutWrapper>
        <Menu page={page} menuItems={menuItems()} />

        <MainWrapper>
          <NavBar />

          <ContentWrapper>{children}</ContentWrapper>

          <Footer />
        </MainWrapper>
      </LayoutWrapper>

      <ScrollToTop />
    </>
  );
};

export default SystemLayout;
