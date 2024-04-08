// ** Internal Imports
import MuiDialog from "./dialog";
import MuiDataGrid from "./data-grid";

// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Overrides = (theme: Theme) => {
  const dialog = MuiDialog(theme);
  const dataGrid = MuiDataGrid(theme);

  return Object.assign(dialog, dataGrid);
};

export default Overrides;
