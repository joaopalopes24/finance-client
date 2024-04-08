// ** Internal Imports
import NoRows from "./no-rows";
import Loading from "./loading";
import { Table } from "@/hooks/table";

// ** MUI Imports
import { DataGrid } from "@mui/x-data-grid";

interface PageProps {
  table: Table;
  columns: any;
  status: string;
}

const CustomDataGrid = ({ status, table, columns }: PageProps) => {
  const { rows, sort, setSort } = table;

  return (
    <DataGrid
      autoHeight
      hideFooter
      rows={rows}
      sortModel={sort}
      columns={columns}
      disableColumnMenu
      sortingMode="server"
      loading={status === "loading"}
      onSortModelChange={(newSort) => setSort(newSort)}
      slots={{ noRowsOverlay: NoRows, loadingOverlay: Loading }}
    />
  );
};

export default CustomDataGrid;
