// ** External Imports
import { first } from "lodash";
import { useState } from "react";

// ** Internal Imports
import { GridSortDirection, GridSortModel } from "@mui/x-data-grid";

type Query = {
  page: number;
  limit: number;
  search: string;
  sort: GridSortDirection;
  field: string | undefined;
};

export type Pagination = {
  total: number;
  limit: number;
  lastPage: number;
  currentPage: number;
};

export type Table = {
  rows: any;
  page: number;
  query: Query;
  limit: number;
  search: string;
  sort: GridSortModel;
  pagination: Pagination;
  setRows: (rows: any) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  setSort: (sort: GridSortModel) => void;
  setPagination: (pagination: Pagination) => void;
};

const useTable = (): Table => {
  const [rows, setRows] = useState<any>([]);

  const [page, setPage] = useState<number>(1);

  const [search, setSearch] = useState<string>("");

  const [limit, setLimit] = useState<number>(10);

  const [sort, setSort] = useState<GridSortModel>([]);

  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    limit: 10,
    lastPage: 1,
    currentPage: 1,
  });

  const query = {
    page: page,
    limit: limit,
    search: search,
    sort: first(sort)?.sort,
    field: first(sort)?.field,
  };

  // prettier-ignore
  return { page, rows, sort, query, search, limit, pagination, setPage, setRows, setSort, setLimit, setSearch, setPagination };
};

export default useTable;
