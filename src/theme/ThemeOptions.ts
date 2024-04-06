// ** Internal Imports
import palette from "@/theme/palette";
import spacing from "@/theme/spacing";
import breakpoints from "@/theme/breakpoints";

// ** MUI Imports
import { ThemeOptions } from "@mui/material";

const themeOptions = (): ThemeOptions => {
  const themeConfig = {
    ...spacing,

    breakpoints: breakpoints(),

    palette: palette(),
  };

  return themeConfig;
};

export default themeOptions;
