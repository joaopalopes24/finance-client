"use client";

// ** External Imports
import { useQuery } from "react-query";

// ** Internal Imports
import api from "@/repositories/api";
import useTable from "@/hooks/table";
import withAuth from "@/hocs/with-auth";
import SystemLayout from "@/layouts/system";
import Header from "@/components/table/header";
import Pagination from "@/components/table/pagination";
import { getData, getPagination } from "@/utils/helpers";
import CustomDataGrid from "@/components/table/data-grid";

// ** MUI Imports
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { GridColDef } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Action Columns
import { StatusAction, ButtonAction, CreateAction } from "./components";

const columns: GridColDef[] = [
  {
    flex: 1,
    minWidth: 140,
    field: "name",
    headerName: "Name",
  },
  {
    flex: 0.3,
    minWidth: 100,
    type: "actions",
    field: "status",
    headerName: "Status",
    getActions: (params) => {
      const { id } = params.row;

      return [<StatusAction key={`status-${id}`} costCenter={params.row} />];
    },
  },
  {
    width: 200,
    type: "actions",
    field: "actions",
    headerName: "Ações",
    getActions: (params) => {
      const { id } = params.row;

      return [<ButtonAction key={`edit-${id}`} costCenter={params.row} />];
    },
  },
];

const Page = () => {
  const table = useTable();

  const { query, setRows, setPagination } = table;

  const { status } = useQuery({
    queryKey: ["/api/cost-centers", query],
    queryFn: () =>
      api.costCenter.getAll(query).then((response) => {
        setRows(getData(response) || []);

        setPagination(getPagination(response));
      }),
  });

  return (
    <SystemLayout page="c34a9530-f876-4ebe-9b41-4bca3dcb1671">
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Cost Centers
          </Typography>

          <Divider sx={{ marginY: 4 }} />

          <Header table={table}>
            <CreateAction />
          </Header>

          <CustomDataGrid status={status} table={table} columns={columns} />

          <Pagination table={table} />
        </CardContent>
      </Card>
    </SystemLayout>
  );
};

export default withAuth(Page);
