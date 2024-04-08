"use client";

// ** External Imports
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import { createSchema } from "@/utils/validations";
import { getMessage, getValidations, withValidation } from "@/utils/helpers";

// ** MUI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogContentText from "@mui/material/DialogContentText";

const validation = createSchema((yup) => ({
  name: yup.string().required().max(255),
  status: yup.boolean().required(),
}));

const Page = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleClose = () => {
    router.push("/cost-centers", { scroll: false });
  };

  const methods = useForm<any>({
    defaultValues: {
      name: "",
      status: false,
    },
    resolver: validation,
  });

  const submit = methods.handleSubmit(async (values) => {
    try {
      const response = await api.costCenter.create(values);

      handleClose();

      toast.success(getMessage(response));

      queryClient.invalidateQueries("/api/cost-centers");
    } catch (error) {
      getValidations(methods, error as AxiosError);
    }
  });

  return (
    <FormProvider {...methods}>
      <Dialog
        fullWidth
        open={true}
        maxWidth="xs"
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: submit,
        }}
      >
        <DialogTitle color="primary">Create Cost Center</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Fill in the information below to create a new cost center.
          </DialogContentText>

          <TextField
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            sx={{ marginTop: 4 }}
            {...methods.register("name")}
            {...withValidation(methods, "name")}
          />

          <Controller
            name="status"
            control={methods.control}
            render={({ field }) => (
              <FormControlLabel
                label="Status"
                sx={{ marginTop: 2 }}
                control={<Switch {...field} checked={field.value} />}
              />
            )}
          />
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
