// ** MUI Imports
import { Theme } from "@mui/material/styles";

const DataGrid = (theme: Theme) => {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "--DataGrid-overlayHeight": "300px",
          "&.MuiDataGrid-root": {
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader:focus-within": {
              outline: "none !important",
            },
          },
        },
      },
    },
  };
};

export default DataGrid;
