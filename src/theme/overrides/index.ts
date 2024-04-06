// ** Internal Imports
import MuiDialog from "./dialog";

// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Overrides = (theme: Theme) => {
  const dialog = MuiDialog(theme);

  return Object.assign(dialog);
};

export default Overrides;
