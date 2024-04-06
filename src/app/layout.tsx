// ** Fonts Imports
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// ** External Imports
import { ReactNode } from "react";
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

// ** Internal Imports
import appConfig from "@/config/app";

type LayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: appConfig.name,
  description: `${appConfig.name} - Proposed challenge for developer vacancy!`,
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <html lang="en-US">
      <body className="soft-scrollbar" suppressHydrationWarning>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default Layout;
