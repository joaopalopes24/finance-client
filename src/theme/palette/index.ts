// ** MUI Imports
import { PaletteMode } from "@mui/material";

type Palette = {
  mode: PaletteMode;
  primary: {
    main: string;
  };
  secondary: {
    main: string;
  };
  common: {
    black: string;
    white: string;
  };
  background: {
    paper: string;
    default: string;
  };
};

const DefaultPalette = (): Palette => {
  return {
    mode: "light",
    primary: {
      main: "#a51921",
    },
    secondary: {
      main: "#ea580c",
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    background: {
      paper: "#ffffff",
      default: "#f5f5f5",
    },
  };
};

export default DefaultPalette;
