// ** External Imports
import { Toaster } from "sonner";
import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";

// ** Internal Imports
import overrides from "@/theme/overrides";
import themeOptions from "@/theme/ThemeOptions";
import CustomStyles from "@/theme/custom-styles";

// ** MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface Props {
  children: ReactNode;
}

const ThemeComponent = (props: Props) => {
  const { children } = props;

  const coreThemeConfig = themeOptions();

  let theme = createTheme(coreThemeConfig);

  theme = createTheme(theme, {
    components: { ...overrides(theme) },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => CustomStyles(theme) as any} />
      <NextTopLoader showSpinner={false} color={theme.palette.primary.main} />
      <Toaster richColors theme={theme.palette.mode} duration={5000} position="bottom-center" />
      {children}
    </ThemeProvider>
  );
};

export default ThemeComponent;
