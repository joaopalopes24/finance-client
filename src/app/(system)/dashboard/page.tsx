"use client";

// ** External Imports
import { find } from "lodash";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Chart as ChartJS, CategoryScale, Title } from "chart.js";
import { LinearScale, BarElement, Tooltip, Legend } from "chart.js";

// ** Internal Imports
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import { getData } from "@/utils/helpers";
import SystemLayout from "@/layouts/system";
import { OperationEnum } from "@/enum/operation";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { DatePicker } from "@mui/x-date-pickers";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import CardContent from "@mui/material/CardContent";

// prettier-ignore
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Transaction = {
  amount: number;
  operation: number;
};

type AccountPlan = {
  name: string;
  transactions: Transaction[];
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Report by Account Plan",
    },
  },
};

const Page = () => {
  const [report, setReport] = useState<AccountPlan[]>([]);

  const methods = useForm<any>({
    defaultValues: {
      start_date: null,
      end_date: null,
    },
  });

  const submit = methods.handleSubmit(async (values) => {
    const response = await api.dashboard.getReport(values);

    setReport(getData(response) || []);
  });

  useEffect(() => {
    submit();
  }, []);

  const chartData = () => {
    return {
      labels: report.map((data) => data.name),
      datasets: [
        {
          label: "Income",
          data: report.map((data) => {
            return (
              find(data.transactions, ["operation", OperationEnum.INCOME])
                ?.amount || 0
            );
          }),
          backgroundColor: "rgb(22, 163, 74)",
        },
        {
          label: "Expense",
          data: report.map((data) => {
            return (
              find(data.transactions, ["operation", OperationEnum.EXPENSE])
                ?.amount || 0
            );
          }),
          backgroundColor: "rgb(220, 38, 38)",
        },
      ],
    };
  };

  return (
    <SystemLayout page="d29b0eec-709c-406c-9c75-05d74eca14c0">
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Dashboard
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Controller
                name="start_date"
                control={methods.control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Start Date"
                    sx={{ maxWidth: 180 }}
                    slotProps={{
                      textField: {
                        size: "small",
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="end_date"
                control={methods.control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="End Date"
                    sx={{ maxWidth: 180 }}
                    slotProps={{
                      textField: {
                        size: "small",
                      },
                    }}
                  />
                )}
              />

              <LoadingButton
                variant="contained"
                onClick={() => submit()}
                loading={methods.formState.isSubmitting}
              >
                Search
              </LoadingButton>
            </Box>
          </Box>

          <Divider sx={{ marginY: 4 }} />

          <Bar data={chartData()} options={options} />
        </CardContent>
      </Card>
    </SystemLayout>
  );
};

export default withAuth(Page);
