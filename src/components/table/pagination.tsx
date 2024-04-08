// ** Internal Imports
import { Table } from "@/hooks/table";

// ** MUI Imports
import Box from "@mui/material/Box";
import MuiPagination from "@mui/material/Pagination";

interface PageProps {
  table: Table;
}

const Pagination = ({ table }: PageProps) => {
  const { page, pagination, setPage } = table;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (pagination.lastPage === 1) {
    return null;
  }

  return (
    <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
      <MuiPagination
        page={page}
        color="primary"
        onChange={handleChange}
        count={pagination.lastPage}
      />
    </Box>
  );
};

export default Pagination;
