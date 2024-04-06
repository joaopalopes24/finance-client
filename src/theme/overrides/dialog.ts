// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Dialog = (theme: Theme) => {
  return {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1, 6, 4),
          justifyContent: "space-between",
        },
      },
    },
  };
};

export default Dialog;
