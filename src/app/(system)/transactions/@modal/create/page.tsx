"use client";

// ** External Imports
import { get } from "lodash";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import { createSchema } from "@/utils/validations";
import TextMoney from "@/components/form/text-money";
import { StatusCases, StatusValues } from "@/enum/status";
import { OperationCases, OperationValues } from "@/enum/operation";
import { getData, getMessage, getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";
import DialogContentText from "@mui/material/DialogContentText";

type CostCenter = {
  id: number;
  name: string;
};

type AccountPlan = {
  id: number;
  name: string;
};

const MenuProps = {
  style: { marginTop: 8 },
  PaperProps: { style: { maxHeight: 240 } },
};

const validation = createSchema((yup) => ({
  cost_center_id: yup.number().required(),
  account_plan_id: yup.number().required(),
  description: yup.string().required().max(255),
  amount: yup.number().required().min(0.01),
  date: yup.date().required(),
  operation: yup.number().required().oneOf(OperationValues),
  status: yup.number().required().oneOf(StatusValues),
}));

const Page = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [costCenters, setCostCenters] = useState<CostCenter[]>([]);

  const [accountPlans, setAccountPlans] = useState<AccountPlan[]>([]);

  const handleClose = () => {
    router.push("/transactions", { scroll: false });
  };

  const methods = useForm<any>({
    defaultValues: {
      cost_center_id: "",
      account_plan_id: "",
      description: "",
      amount: 0,
      date: null,
      operation: "",
      status: "",
    },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      const response = await api.transaction.create(values);

      handleClose();

      toast.success(getMessage(response));

      queryClient.invalidateQueries("/api/transactions");
    } catch (error) {
      getValidations(methods, error as AxiosError);
    }
  });

  useEffect(() => {
    api.search.getCostCenters().then((response) => {
      setCostCenters(getData(response));
    });

    api.search.getAccountPlans().then((response) => {
      setAccountPlans(getData(response));
    });
  }, []);

  return (
    <FormProvider {...methods}>
      <Dialog
        fullWidth
        open={true}
        maxWidth="md"
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: submit,
        }}
      >
        <DialogTitle color="primary">Create Transaction</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Fill in the information below to create a new transaction.
          </DialogContentText>

          <Grid container spacing={4} sx={{ marginTop: 2 }}>
            <Grid item container sm={6}>
              <Controller
                name="cost_center_id"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth>
                    <InputLabel id="cost-center" error={fieldState.invalid}>
                      Cost Center
                    </InputLabel>

                    <Select
                      {...field}
                      id="cost-center"
                      label="Cost Center"
                      labelId="cost-center"
                      MenuProps={MenuProps}
                      error={fieldState.invalid}
                    >
                      {costCenters.map((costCenter, index) => (
                        <MenuItem key={index} value={costCenter.id}>
                          {costCenter.name}
                        </MenuItem>
                      ))}
                    </Select>

                    {fieldState.invalid && (
                      <FormHelperText error>
                        {get(fieldState.error, "message")}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item container sm={6}>
              <Controller
                name="account_plan_id"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth>
                    <InputLabel id="account-plan" error={fieldState.invalid}>
                      Account Plan
                    </InputLabel>

                    <Select
                      {...field}
                      id="account-plan"
                      label="Account Plan"
                      labelId="account-plan"
                      MenuProps={MenuProps}
                      error={fieldState.invalid}
                    >
                      {accountPlans.map((costCenter, index) => (
                        <MenuItem key={index} value={costCenter.id}>
                          {costCenter.name}
                        </MenuItem>
                      ))}
                    </Select>

                    {fieldState.invalid && (
                      <FormHelperText error>
                        {get(fieldState.error, "message")}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item container sm={6}>
              <Controller
                name="description"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    id="description"
                    variant="outlined"
                    label="Description"
                    {...withValidation(methods, "description")}
                  />
                )}
              />
            </Grid>

            <Grid item container sm={6}>
              <Controller
                name="date"
                control={methods.control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Date"
                    sx={{ width: "100%" }}
                    slotProps={{
                      textField: withValidation(methods, "date"),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item container sm={4}>
              <Controller
                name="amount"
                control={methods.control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    id="amount"
                    label="Amount"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    {...withValidation(methods, "amount")}
                    InputProps={{ inputComponent: TextMoney as any }}
                  />
                )}
              />
            </Grid>

            <Grid item container sm={4}>
              <Controller
                name="operation"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth>
                    <InputLabel id="operation" error={fieldState.invalid}>
                      Operation
                    </InputLabel>

                    <Select
                      {...field}
                      id="operation"
                      label="Operation"
                      labelId="operation"
                      MenuProps={MenuProps}
                      error={fieldState.invalid}
                    >
                      {OperationCases.map((operation, index) => (
                        <MenuItem key={index} value={operation.value}>
                          {operation.label}
                        </MenuItem>
                      ))}
                    </Select>

                    {fieldState.invalid && (
                      <FormHelperText error>
                        {get(fieldState.error, "message")}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item container sm={4}>
              <Controller
                name="status"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth>
                    <InputLabel id="status" error={fieldState.invalid}>
                      Status
                    </InputLabel>

                    <Select
                      {...field}
                      id="status"
                      label="Status"
                      labelId="status"
                      MenuProps={MenuProps}
                      error={fieldState.invalid}
                    >
                      {StatusCases.map((status, index) => (
                        <MenuItem key={index} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>

                    {fieldState.invalid && (
                      <FormHelperText error>
                        {get(fieldState.error, "message")}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" loading={methods.formState.isSubmitting}>
            Create
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default withAuth(Page);
