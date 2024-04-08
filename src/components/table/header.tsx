// ** External Imports
import { debounce } from "lodash";
import Magnify from "mdi-material-ui/Magnify";
import { ChangeEvent, ReactNode } from "react";

// ** Internal Imports
import { Table } from "@/hooks/table";

// ** MUI Imports
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PageProps {
  table: Table;
  children?: ReactNode;
}

const PAGINATE = [10, 25, 50, 100];

const Header = ({ table, children }: PageProps) => {
  const { limit, setPage, setSearch, setLimit } = table;

  const resetPage = () => setPage(1);

  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(Number(event.target.value));

    resetPage();
  };

  const handleSearchChange = (event: ChangeEvent) => {
    // @ts-ignore
    setSearch(event.target.value as string);

    resetPage();
  };

  const debouncedSave = debounce(handleSearchChange, 1500);

  return (
    <Box
      sx={{
        paddingY: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControl sx={{ paddingRight: 4 }}>
          <Select
            id="limit"
            size="small"
            value={limit.toString()}
            onChange={handleLimitChange}
          >
            {PAGINATE.map((item: number) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {children && children}
      </Box>

      <TextField
        size="small"
        id="search"
        name="search"
        variant="outlined"
        placeholder="Search"
        onChange={debouncedSave}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Magnify />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Header;
