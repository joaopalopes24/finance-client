"use client";

// ** External Imports
import { toast } from "sonner";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import { useParams, useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";

// ** Internal Imports
import api from "@/repositories/api";
import withAuth from "@/hocs/with-auth";
import { createSchema } from "@/utils/validations";
import { getDataKey, getMessage, getValidations, withValidation } from "@/utils/helpers";

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
  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

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
      const response = await api.costCenter.update(id, values);

      handleClose();

      toast.success(getMessage(response));

      queryClient.invalidateQueries("/api/cost-centers");
    } catch (error) {
      getValidations(methods, error as AxiosError);
    }
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.costCenter.getById(id);

        methods.setValue("name", getDataKey(response, "name"));
        methods.setValue("status", getDataKey(response, "status"));
      } catch (error) {
        toast.error(getMessage(error as AxiosError));
      }
    };

    fetch();
  }, []);

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
        <DialogTitle color="primary">Edit Cost Center</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Fill in the information below to edit the cost center.
          </DialogContentText>

          <Controller
            name="name"
            control={methods.control}
            render={({ field }) => (
              <TextField
                fullWidth
                id="name"
                {...field}
                label="Name"
                variant="outlined"
                sx={{ marginTop: 4 }}
                {...withValidation(methods, "name")}
              />
            )}
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
            Edit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};

export default withAuth(Page);
