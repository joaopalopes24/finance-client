// ** External Imports
import dayjs from 'dayjs';
import { Toaster } from "sonner";
import { ReactNode } from "react";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import NextTopLoader from "nextjs-toploader";
import { QueryClientProvider } from "react-query";

// ** Internal Imports
import overrides from "@/theme/overrides";
import themeOptions from "@/theme/ThemeOptions";
import CustomStyles from "@/theme/custom-styles";
import { queryClient } from "@/services/react-query";

// ** MUI Imports
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { responsiveFontSizes } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";

interface Props {
  children: ReactNode;
}

dayjs.extend(utc);
dayjs.extend(timezone);

const ThemeComponent = (props: Props) => {
  const { children } = props;

  const coreThemeConfig = themeOptions();

  let theme = createTheme(coreThemeConfig);

  theme = createTheme(theme, {
    components: { ...overrides(theme) },
  });

  theme = responsiveFontSizes(theme);

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <GlobalStyles styles={() => CustomStyles(theme) as any} />

          <NextTopLoader
            showSpinner={false}
            color={theme.palette.primary.main}
          />

          <Toaster
            richColors
            duration={5000}
            position="bottom-center"
            theme={theme.palette.mode}
          />

          {children}
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default ThemeComponent;
